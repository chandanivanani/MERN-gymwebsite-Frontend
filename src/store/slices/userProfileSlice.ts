import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  profilePhoto: string;
  height?: number;
  role?: number;
  weight?: number;
  bio: string;
}

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (axiosPrivate:any , { rejectWithValue }) => {

    try {
      const response = await axiosPrivate.get("/user/profile");
      // console.log("user profileSlice", response.data.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ data, axiosPrivate }: {data:UserData; axiosPrivate:any }, { rejectWithValue }) => {

    try {
      const response = await axiosPrivate.put("user/updatedata", data);
      console.log("update UserProfile Data:", response.data.data);
      // if (response.status === 200) {
        return response.data.data;
      // }
      // return rejectWithValue("Profile update failed.Please try again");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "failed to Updating user profile"
      );
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  "user/uploadPhoto",
  async({formData,axiosPrivate} : {formData:FormData; axiosPrivate:any}, {rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("user/uploadphoto", formData, {
        headers: {"Content-Type" : "multipart/form-data" },
      });
      return response.data.data;
    }catch(error:any) {
      return rejectWithValue(error.response?.data?.message || "Failed to upload photo");
    }
  }
);

export const deletePhoto = createAsyncThunk(
    "user/deletePhoto",
    async (axiosPrivate:any, {rejectWithValue}) => {
      try  {
        await axiosPrivate.delete("user/deletephoto");
        return null;
      } catch (error:any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete photo");
      }
    }
);

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    // resetUser: (state) => {
    //   state.userData = null;
    // },
    // setUser: (state, action) => {
    //   state.userData = action.payload;
    // },
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
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state,action) => {
        state.loading = false;
        if(state.userData) {
          state.userData.profilePhoto = action.payload;
        }
      })
      .addCase(uploadPhoto.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.loading = false;
        if(state.userData) {
          state.userData.profilePhoto = "";
        }
      })
      .addCase(deletePhoto.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userProfileSlice.reducer;
// export const { resetUser, setUser } = userProfileSlice.actions;
