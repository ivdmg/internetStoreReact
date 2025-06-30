import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main/MainPage";
import { FavoritePage } from "./pages/favorite/FavoritePage";
import { useDispatch } from "react-redux";
import { fetchFavoritesProducts } from "./pages/favorite/favoriteSlice";
import { fetchProducts } from "./pages/main/productSlice";
import { BasketPage } from "./pages/basket/BasketPage";
import { fetchBasketProducts } from "./pages/basket/basketSlice";
import { ProductPage } from "./pages/product/ProductPage";

function App() {
  // const products = [
  //   { id: 1, brand: 'Samsung', name: 'samsung s20', price: 300, category: 'phone', rating: '5', image: 'https://ir.ozone.ru/s3/multimedia-s/c1000/6383506840.jpg' },
  //   { id: 2, brand: 'Apple', name: 'iphone 15 pro', price: 400, category: 'phone', rating: '5', image: 'https://белоеяблоко.рф/upload/iblock/73c/hd5zk1a8d0i6b0syiot1a78eqxo8mj6z.png' },
  //   { id: 3, brand: 'Samsung', name: 'Galaxy Z fold', price: 400, category: 'phone', rating: '5', image: 'https://kazandigital.ru/uploaded/images/shop/goods/2758294-1.jpg' },
  //   { id: 4, brand: 'Apple', name: 'iphone 16', price: 500, category: 'phone', rating: '5', image: 'https://maxmobiles.ru/images/detailed/110/7_8cce-ot.jpg' },
  //   { id: 5, brand: 'Google', name: 'Pixel 9', price: 400, category: 'phone', rating: '5', image: 'https://ibrat.ru/upload/iblock/52a/unwi7831ig7bhe2qt7lriinucwj6jls0.png' },
  //   { id: 6, brand: 'HP', name: 'HP Laptop 14s', price: 800, category: 'laptop', rating: '5', image: 'https://img.mvideo.ru/Big/30066482bb1.jpg' },
  //   { id: 7, brand: 'Apple', name: 'Macbook pro m4', price: 1200, category: 'laptop', rating: '5', image: 'https://i-center.by/images/b/apple-macbook-pro-16-2-m4-pro-2024-mx2u3_1.jpg' },
  //   { id: 8, brand: 'Asus', name: 'Asus TUF Gaming', price: 1100, category: 'laptop', rating: '5', image: 'https://delta-game.ru/wp-content/uploads/2022/11/asus-tuf-gaming-a17-fa707re.webp' },
  //   { id: 9, brand: 'Samsung', name: 'Samsung s27c', price: 900, category: 'monitor', rating: '5', image: 'https://cdn.citilink.ru/OqauCcP5C3TcunMohYEIiNbi_wv0Jv8QkdP9O097ydM/resizing_type:fit/gravity:sm/width:400/height:400/plain/product-images/4f4b5b07-ab88-44bd-8a74-df178fde8618.jpg' },
  //   { id: 10, brand: 'Ardor', name: 'Ardor gaming 27', price: 1500, category: 'monitor', rating: '5', image: 'https://ir.ozone.ru/s3/multimedia-x/c1000/6856940373.jpg' },
  // ]

  const dispatch = useDispatch();

  const [inputSearchName, setInputSearchName] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [sortCost, setSortCost] = useState("")

  useEffect(() => {
    dispatch(fetchProducts({ inputSearchName, categoryProduct, sortCost }));
  }, [inputSearchName, categoryProduct, sortCost]);

  useEffect(() => {
    dispatch(fetchFavoritesProducts());
    dispatch(fetchBasketProducts());
  }, []);

  const inputSearctHandler = (event) => {
    setInputSearchName(event);
  };

  const changeCategoryProduct = (category) => {
    if (categoryProduct === category) {
      setCategoryProduct("");
      return;
    }
    setCategoryProduct(category);
  };

  const sortCostHandler = (order) => {
    if(sortCost === order){
      setSortCost("")
      return
    }
    setSortCost(order);
  }


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage
                inputSearctHandler={inputSearctHandler}
                changeCategoryProduct={changeCategoryProduct}
                categoryProduct={categoryProduct}
                sortCostHandler={sortCostHandler}
                sortCost={sortCost}
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
