import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBasketProducts = createAsyncThunk(
    "basket/fetchBasketProducts",
  async () => {
    const response = await fetch(`http://localhost:7000/basket`);
    const result = await response.json();
    return result;
  }
);

export const addBasketProductsAsync = createAsyncThunk(
  "basket/addBasketProductsAsync",
  async (params, { dispatch }) => {
    await fetch("http://localhost:7000/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    dispatch(fetchBasketProducts());
  }
);

export const deleteBasketProductsAsync = createAsyncThunk(
  "basket/deleteBasketProductsAsync",
  async (params, { dispatch }) => {
    await fetch(`http://localhost:7000/basket/${params}`, {
      method: "DELETE",
    });
    dispatch(fetchBasketProducts());
  }
);

export const updateBasketProductsAsync = createAsyncThunk(
  "basket/updateBasketProductsAsync",
  async (params, { dispatch }) => {
    await fetch(`http://localhost:7000/basket/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    dispatch(fetchBasketProducts());
  }
);

const initialState = {
  products: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasketProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default basketSlice.reducer;
