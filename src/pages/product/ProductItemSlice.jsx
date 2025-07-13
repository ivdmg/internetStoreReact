import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductItem = createAsyncThunk(
  "products/fetchProductItem",
  async (params) => {
    const response = await fetch(`http://localhost:7000/products/${params}`);
    const result = await response.json();
    return result;
  }
);

export const loadComments = createAsyncThunk(
  "products/loadComments",
  async (productId) => {
    const response = await fetch(`http://localhost:7000/comments?productId=${productId}`);
    const result = await response.json();
    return result;
  }
);

export const createComment = createAsyncThunk(
  "products/createComment",
  async (params, {dispatch}) => {
    await fetch(`http://localhost:7000/comments/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    dispatch(loadComments(params.productId));
  }
);

const initialState = {
  item: [],
  comments: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductItem.fulfilled, (state, action) => {
      state.item = action.payload;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default productSlice.reducer;
