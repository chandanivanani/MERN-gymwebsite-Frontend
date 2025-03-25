import { axiosPrivate } from './axios';
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout,updateToken } from "../store/slices/authSlice";

const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.get("auth/refresh");

            console.log("Refreshed token:",response.data);
            const newToken = response.data.data;

            if(newToken){
                dispatch(updateToken(newToken));
                return newToken;
            }
        } catch (error: any) {
            console.error("Token refresh failed:",error);
            if([400, 401, 403].includes(error.response?.status)) {
                dispatch(logout());
                navigate("/login");
            }
            return null;
        }
    };
    return refresh;
};

export default useRefreshToken;