import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import citiesReducer from "./citiesSlice";
export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
