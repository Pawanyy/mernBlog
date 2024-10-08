import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loding: false,
    tokenInfo: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart(state) {
            state.loading = true;
            state.error = null;
        },
        signInSuccess(state, action) {
            state.currentUser = action.payload.user;
            state.tokenInfo = action.payload.tokenInfo;
            state.loading = false;
            state.error = null;
        },
        signInFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;