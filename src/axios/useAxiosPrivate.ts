import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../store/slices/authSlice";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "./axios"; // Axios instance

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const dispatch = useDispatch();
    const { token } = useSelector((state: any) => state.auth);

    useEffect(() => {
        // console.log("Axios Private Hook Mounted, Current Token:", token);

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true; // Prevent infinite loop
                    const newAccessToken = await refresh();
                    if (newAccessToken) {
                        dispatch(updateToken(newAccessToken));
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest); // Retry request with new token
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [token, refresh, dispatch]);

    return axiosPrivate;
};

export default useAxiosPrivate;