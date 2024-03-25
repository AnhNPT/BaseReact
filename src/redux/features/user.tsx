import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IUserData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
}

const initStateUserValue: IUserData = {
    id: NaN,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
};

export const UserLogin = createAsyncThunk("login", async ({ username, password }: { username: string; password: string }) => {
    try {
        const response = await axios.post(`https://dummyjson.com/auth/login`, {
            username: username,
            password: password,
        });
        return response?.data;
    } catch (error) {
        throw new Error("Error!!!");
    }
});

const userSlice = createSlice({
    name: "userLogin",
    initialState: {
        value: initStateUserValue,
    },
    reducers: {
        logout: (state) => {
            state.value = initStateUserValue;
        },
    },
    extraReducers(builder) {
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
