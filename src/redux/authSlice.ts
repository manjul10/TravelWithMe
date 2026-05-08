import { createSlice, PayLoadAction } from "@reduxjs/toolkit";

type AuthState = {
    isLoggedIn: boolean;
    email: string | null;
};

const initialState: AuthState = {
    isLoggedIn: false, 
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayLoadAction<string>) => {
            state.isLoggedIn = true;
            state.email = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = null;
        },
    },
});