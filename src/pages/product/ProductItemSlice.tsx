import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CommentType = {
  userName: string;
  text: string;
  productId: number;
  date: string;
  id?: number;
};

export const fetchProductItem = createAsyncThunk<ProductType, string>(
  "products/fetchProductItem",
  async (id) => {
    const response = await fetch(`http://localhost:7000/products/${id}`);
    const result = await response.json();
    return result;
  }
);

export const loadComments = createAsyncThunk<CommentType[], number>(
  "products/loadComments",
  async (productId) => {
    const response = await fetch(
      `http://localhost:7000/comments?productId=${productId}`
    );
    const result = await response.json();
    return result;
  }
);

export const createComment = createAsyncThunk<void, CommentType>(
  "products/createComment",
  async (params, { dispatch }) => {
    await fetch(`http://localhost:7000/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    dispatch(loadComments(params.productId));
  }
);
type Item = {};

type InitialStateType = {
  item: ProductType | null;
  comments: CommentType[];
};

const initialState: InitialStateType = {
  item: null,
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
