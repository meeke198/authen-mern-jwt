import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../redux/features/auth/authSlice";
import sessionReducer from "../redux/features/session/sessionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
  },
});

