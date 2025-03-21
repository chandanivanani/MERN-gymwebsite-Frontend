import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
    },
});

//Type for Rootstate (entire store state) for useSelector
export type RootState = ReturnType<typeof store.getState>;

//Type for Dispatch function
export type AppDispatch = typeof store.dispatch;