import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './pages/favorite/favoriteSlice'
import productsReducer from './pages/main/productSlice'
import basketReducer from './pages/basket/basketSlice'
import productReducer from './pages/product/ProductItemSlice'

export const store = configureStore({
  reducer: {favorites: favoritesReducer, products: productsReducer, basket: basketReducer, product: productReducer},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch