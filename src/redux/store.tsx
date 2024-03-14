import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import listProductReducer from "./features/listProduct";

const Store = configureStore({
    reducer: {
        user: userReducer,
        listProducts: listProductReducer
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
