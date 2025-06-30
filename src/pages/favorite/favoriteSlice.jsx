import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavoritesProducts = createAsyncThunk(
  "favorites/fetchFavoritesProducts",
  async () => {
    const response = await fetch(`http://localhost:7000/favorites`);
    const result = await response.json();
    return result;
  }
);

export const addFavoriteProductsAsync = createAsyncThunk(
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

export const deleteFavoriteProductsAsync = createAsyncThunk(
  "favorites/deleteFavoriteProducts",
  async (params, { dispatch }) => {
    await fetch(`http://localhost:7000/favorites/${params}`, {
      method: "DELETE",
    });
    dispatch(fetchFavoritesProducts());
  }
);

const initialState = {
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
