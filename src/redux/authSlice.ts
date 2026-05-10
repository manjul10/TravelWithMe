import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  email: string | null;
};

const savedEmail = sessionStorage.getItem("userEmail");

const initialState: AuthState = {
  isLoggedIn: !!savedEmail,
  email: savedEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.email = action.payload;

      sessionStorage.setItem("userEmail", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      sessionStorage.removeItem("userEmail");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
