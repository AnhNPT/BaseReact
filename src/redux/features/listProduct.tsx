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
const initialStateListProduct: IProductsResponse = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
};

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
    initialState: initialStateListProduct,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productsSlice.reducer;
