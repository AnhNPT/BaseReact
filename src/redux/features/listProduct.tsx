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
interface IInitialState {
    productResponse: IProductsResponse;
    isLoading: boolean;
    totalResultCount: number;
}

const initialStateListProduct: IProductsResponse = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
};

const initalState: IInitialState = {
    productResponse: initialStateListProduct,
    isLoading: true,
    totalResultCount: 0,
};

export const fetchProducts = createAsyncThunk("listProduct", async ({ limit, page }: { limit: number; page: number }) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}`);
        const totalResultCount = response.data.total;
        return [response.data, totalResultCount];
    } catch (error) {
        throw new Error("Error!!!");
    }
});

const productsSlice = createSlice({
    name: "listItemSlide",
    initialState: initalState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productResponse = action.payload[0];
            state.totalResultCount = action.payload[1];
        });
    },
});

export default productsSlice.reducer;
