import useAxiosPrivate from "../../axios/useAxiosPrivate";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const axiosPrivate = useAxiosPrivate();

interface UserData {
    firstname: string;
    lastname: string;
    email:string;
    gender:string;
    profilePhoto: string;
    height?: number;
    role?:number;
    weight?:number;
    bio:string;
}

interface UserState {
    userData: UserData | null;
    loading: boolean;
    error: string | null;
}

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get('user/profile');
            console.log("user profileSlice",response.data.data);
            return response.data.data;
    
        } catch (error:any) {
            return rejectWithValue( error.response?.data?.message || 'Failed to fetch user profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (updatedData: UserData, {rejectWithValue}) => {
    try {
        const response = await axiosPrivate.put('user/updatedata', updatedData);
        console.log('update UserProfile Data:',response.data.data);
        return response.data.data;
    } catch (error:any) {
        return rejectWithValue(error.response?.data?.message || "failed to Updating user profile");
    }
});

const initialState: UserState = {
    userData: null,
    loading: false,
    error: null,
};

const userProfileSlice = createSlice({
   name: "userProfile",
   initialState,
   reducers: {
       resetUserData: (state) => {
           state.userData = initialState.userData;
       },
       
   },
   extraReducers: (builder) => {
       builder
           .addCase(fetchUserProfile.pending, (state) => {
               state.loading = true;
               state.error = null;
           })
           .addCase(fetchUserProfile.fulfilled, (state, action) => {
               state.loading = false;
               state.userData = action.payload;
           })
           .addCase(fetchUserProfile.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload as string;
           })
           .addCase(updateUserProfile.pending, (state) => {
               state.loading = true;
               state.error = null;
           })
           .addCase(updateUserProfile.fulfilled, (state, action) => {
               state.loading = false;
               state.userData = action.payload;
           })
           .addCase(updateUserProfile.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload as string;
           });
    },
});

export default userProfileSlice.reducer;
export const {resetUserData} = userProfileSlice.actions;