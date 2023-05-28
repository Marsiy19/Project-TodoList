import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../login/asyncAction';
import { registerUser } from '../register/asyncAction';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [registerUser.pending]: (state) => {
            state.loading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;