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
interface IProductsResponse {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}
interface IInitialState{
    productResponse:IProductsResponse
}

const initialStateListProduct: IProductsResponse = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
};
const initalState: IInitialState={
    productResponse:initialStateListProduct
}

export const fetchProducts = createAsyncThunk("listProduct", async () => {
    try {
        const response = await axios.get("https://dummyjson.com/products");
        return response.data;
    } catch (error) {
        throw new Error("Error!!!");
    }
});

const productsSlice = createSlice({
    name: "listItemSlide",
    initialState: initalState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productResponse = action.payload;
        });
    },
});

export default productsSlice.reducer;
