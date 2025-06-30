import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductItem = createAsyncThunk(
  "products/fetchProductItem",
  async (params) => {
    const response = await fetch(`http://localhost:7000/products/${params}`);
    const result = await response.json();
    return result;
  }
);

const initialState = {
  item: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductItem.fulfilled, (state, action) => {
      state.item = action.payload;
    });
  },
});

export default productSlice.reducer;
