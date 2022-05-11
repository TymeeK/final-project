import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: false,
    },
    reducers: {
        signin: state => {
            state.value = !state.value;
        },
    },
});

export const { signin } = loginSlice.actions;

export default loginSlice.reducer;
