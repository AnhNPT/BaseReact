import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";

const Store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default Store;
