import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateToken } from "../store/slices/authSlice";

const API_BASE_URL = process.env.REACT_APP_API;
const REFRESH_URL = `${API_BASE_URL}/auth/refresh`;

const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state: any) => state.auth); // Get token from Redux

    const refresh = async () => {
        console.log("Attempting to refresh token...");
        try {
            const response = await axios.get(REFRESH_URL, {
                withCredentials: true, // Needed to send refresh token cookie
            });

            const newAccessToken = response.data.data;
            console.log("New Access Token:", newAccessToken);

            if (newAccessToken) {
                dispatch(updateToken(newAccessToken)); // Update Redux store
                return newAccessToken;
            }
        } catch (error: any) {
            console.error("Token refresh failed:", error);
            if ([400, 401, 403].includes(error.response?.status)) {
                dispatch(logout()); // Logout user if refresh fails
                navigate("/login");
            }
            return null;
        }
    };

    return refresh;
};

export default useRefreshToken;