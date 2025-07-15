import { AppDispatch } from "@/store";
import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavoritesProducts = createAsyncThunk<ProductType[]>(
  "favorites/fetchFavoritesProducts",
  async () => {
    const response = await fetch(`http://localhost:7000/favorites`);
    const result = await response.json();
    return result;
  }
);

export const addFavoriteProductsAsync = createAsyncThunk<void, ProductType, {dispatch: AppDispatch}>(
  "favorites/addFavoriteProducts",
  async (params, { dispatch }) => {
    await fetch("http://localhost:7000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    dispatch(fetchFavoritesProducts());
  }
);

export const deleteFavoriteProductsAsync = createAsyncThunk<void, number, {dispatch: AppDispatch}>(
  "favorites/deleteFavoriteProducts",
  async (id, { dispatch }) => {
    await fetch(`http://localhost:7000/favorites/${id}`, {
      method: "DELETE",
    });
    dispatch(fetchFavoritesProducts());
  }
);

type InitialStateType = {
  favorite: ProductType[]
}

const initialState: InitialStateType = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavoritesProducts.fulfilled, (state, action) => {
      state.favorite = action.payload;
    });
  },
});

export default favoriteSlice.reducer;
