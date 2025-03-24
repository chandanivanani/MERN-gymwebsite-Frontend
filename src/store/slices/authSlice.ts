import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API;
const SIGNUP_URL= `${API_BASE_URL}auth/signup`;
const LOGIN_URL= `${API_BASE_URL}auth/login`;
const FORGOT_PASSWORD_URL= `${API_BASE_URL}auth/forgot`;
const REFRESH_TOKEN_URL= `${API_BASE_URL}auth/refresh`;

interface User {
    username: string;
    email: string;      
    role: number;
    token:string;
    image?:string;
}

interface AuthState {
    user: User | null;
    error: string | null;
    loading: boolean;
}

interface LoginData {
    email: string;
    password: string;   
}

interface LoginResponse {
    token: string;
    user: {
        role: number;
        email: string;
        firstname: string;
        lastname: string;
        profilePhoto? : string;
    };
}

export const signupUser = createAsyncThunk<
       any,
       any,
       {rejectValue: string}
    >(
    "auth/signupUser",
    async (userData , {rejectWithValue}) => {
        try {
            const response = await axios.post(SIGNUP_URL, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
)

export const loginUser = createAsyncThunk<
         any,
        { email: string; password: string; },
       {rejectValue: string}
    >(
    "auth/loginUser",
    async (data : { email, password }, {rejectWithValue}) => {
        try {
            const response = await axios.post(LOGIN_URL, credentials,{
                withCredentials: true
            });

            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
)

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.User.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
             state.loading = true;
            })
             .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload.user;
            })
             .addCase(signupUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "an error occurred";
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "an error occurred";
                state.loading = false;
            })
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;