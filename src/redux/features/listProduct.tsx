import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
// interface IApiResponse {
//     products: IProduct[];
//     total: number;
//     skip: number;
//     limit: number;
// }
interface IProductsState {
    products: IProduct[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: boolean;
}
const initialStateListProduct: IProductsState = {
    products: [],
    status: "idle",
    error: false,
};

export const fetchProducts = createAsyncThunk("listProduct", async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data;
});

const productsSlice = createSlice({
    name: "listSlide",
    initialState: initialStateListProduct,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload;
        });
        // builder.addCase(fetchProducts.rejected, (state, action) => {
        //     state.status = "failed";
        //     state.error = action.payload;
        // });
    },
});

export default productsSlice.reducer;
