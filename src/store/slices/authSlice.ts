import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API;
const SIGNUP_URL = `${API_BASE_URL}auth/signup`;
const LOGIN_URL = `${API_BASE_URL}auth/login`;
// const FORGOT_PASSWORD_URL= `${API_BASE_URL}auth/forgot`;
// const REFRESH_TOKEN_URL= `${API_BASE_URL}auth/refresh`;

interface AuthState {
  user: any | null;
  error: string | null;
  loading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  token: null,
};

interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(SIGNUP_URL, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      //    console.log("Slice-Login res:",response.data);

      const { token } = response.data;
      const { role, email, firstname, lastname, profilephoto } =
        response.data.user;
      const username = firstname + " " + lastname;
      if (response.status === 200) {
        window.localStorage.setItem(
          "user",
          JSON.stringify({ token, role, email, username, profilephoto })
        );
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = authSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
