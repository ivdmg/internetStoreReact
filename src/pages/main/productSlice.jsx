import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const response = await fetch(
      `http://localhost:7000/products?${params}`
    );
    const result = await response.json();
    return result;
  }
);

const initialState = {
  product: [],
  loadingMessage: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loadingMessage = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loadingMessage = false;
      state.product = action.payload;
    });
  },
});

export default productSlice.reducer;
