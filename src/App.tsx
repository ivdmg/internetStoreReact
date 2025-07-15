import "./App.css";
import { useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router";
// @ts-ignore
import { MainPage } from "./pages/main/MainPage";
// @ts-ignore
import { FavoritePage } from "./pages/favorite/FavoritePage";
import { useAppDispatch } from "./reduxHooks";
// @ts-ignore
import { fetchFavoritesProducts } from "./pages/favorite/favoriteSlice";
// @ts-ignore
import { fetchProducts } from "./pages/main/productSlice";
// @ts-ignore
import { BasketPage } from "./pages/basket/BasketPage";
// @ts-ignore
import { fetchBasketProducts } from "./pages/basket/basketSlice";
// @ts-ignore
import { ProductPage } from "./pages/product/ProductPage";

function App() {

  const dispatch = useAppDispatch();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const copyParams = new URLSearchParams(searchParams);  
  const handleChangeFilters = (key: string, value: string) => {
    if(copyParams.get(key) === value || !value){
      copyParams.delete(key)
      if(key === '_order'){
        copyParams.delete('_sort')
      }
    }else if(key === '_order'){
      copyParams.set('_sort', 'price')
      copyParams.set('_order', value)
    }else{
      copyParams.set(key, value)
    }
    if(key !== '_page'){
      copyParams.set('_page', "1")
    }
    setSearchParams(copyParams)
  }

  useEffect(() => {
    if(searchParams){
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);
  
  useEffect(() => {
    copyParams.set('_page', "1")
    setSearchParams(copyParams)
    dispatch(fetchFavoritesProducts());
    dispatch(fetchBasketProducts());
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage
                handleChangeFilters={handleChangeFilters}
                searchParams={searchParams}
              />
            </>
          }
        />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/product/:id" element={<ProductPage/>} />
      </Routes>
    </div>
  );
}

export default App;
