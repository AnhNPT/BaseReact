import { createSlice } from "@reduxjs/toolkit";

const initStateUserValue = {
    name: "",
    age: 0,
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: initStateUserValue,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initStateUserValue;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
