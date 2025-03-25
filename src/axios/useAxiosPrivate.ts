//attach token interceptors

import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch , useSelector} from "react-redux";
import { updateToken } from "../store/slices/authSlice";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const dispatch = useDispatch();
    const {token} = useSelector((state:any) => state.auth);

    useEffect(() => {
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
                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newToken = await refresh();
                    if(newToken) {
                        dispatch(updateToken(newToken));
                        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return axiosPrivate(prevRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    },[token, refresh, dispatch]);

    return axiosPrivate;
};

export default useAxiosPrivate;