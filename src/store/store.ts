import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        userProfile: userProfileReducer,
    },
});

//Type for Rootstate (entire store state) for useSelector
export type RootState = ReturnType<typeof store.getState>;

//Type for Dispatch function
export type AppDispatch = typeof store.dispatch;