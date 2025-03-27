import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

interface AuthState {
  user: any | null;
  error: string | null;
  loading: boolean;
  token: string | null;
  image: string | null;
}

const initialState: AuthState = {
  user: "",
  error: "",
  loading: false,
  token: localStorage.getItem("token") || null,
  image: localStorage.getItem("image") || null
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

interface ForgotData {
  email:string;
  password:string;
  confirmPassword:string;
}

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axios.post("auth/signup", userData);
      console.log(response.data);
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
      const response = await axios.post("auth/login", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

        // console.log("Slice-Login res:",response.data);
      const {role , email , firstname , lastname , profilePhoto} = response.data.user;
      const username = firstname + " " + lastname;
      
      const { token,user } = response.data;
      if (response.status === 200) {
        window.localStorage.setItem("token",token);
        window.localStorage.setItem("image",user.image);
        window.localStorage.setItem("user",JSON.stringify({role,email,username,profilePhoto}),
      );
      }
      return { user,token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data : ForgotData, {rejectWithValue}) => {
      try {
        const response = await axios.post("auth/forgot", data);
        console.log("forgot slice",response);
        }
      
      catch (error: any) {
         return rejectWithValue(error.response?.data?.message || "forgot password failed");
      }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state,action) => {
         state.token = action.payload;
         localStorage.setItem("token",action.payload);
    },
    updateImage: (state,action) => {
       state.image = action.payload;
       localStorage.setItem("image",action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("image");
      state.user = null;
      state.token = null;
      state.image = null;
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
        state.image = action.payload.user.image;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload as string;
      })
  },
});

export const { logout ,updateToken, updateImage } = authSlice.actions;
export default authSlice.reducer;
