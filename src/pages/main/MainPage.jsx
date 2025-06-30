import { useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteProductsAsync,
  deleteFavoriteProductsAsync,
} from "../favorite/favoriteSlice";
import { Sort } from "../../components/Sort/Sort";

export const MainPage = ({
  inputSearctHandler,
  changeCategoryProduct,
  categoryProduct,
  sortCostHandler,
  sortCost,
}) => {
  const favoriteProducts = useSelector((state) => state.favorites.favorite);
  const { product, loadingMessage } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [visibleNavbar, setVisibleNavbar] = useState(false);

  const showNavbarButton = () => {
    setVisibleNavbar(!visibleNavbar);
  };

  const addFavoriteProduct = (product) => {
    if (
      favoriteProducts.some(
        (favoriteProduct) => favoriteProduct.id === product.id
      )
    ) {
      dispatch(deleteFavoriteProductsAsync(product.id));
    } else {
      dispatch(addFavoriteProductsAsync(product));
    }
  };

  return (
    <>
      <Header
        inputSearctHandler={inputSearctHandler}
        showNavbarButton={showNavbarButton}
      />
      {loadingMessage && <h1>Loading...</h1>}
      {visibleNavbar && (
        <Navbar
          changeCategoryProduct={changeCategoryProduct}
          categoryProduct={categoryProduct}
        />
      )}
      <Sort sortCostHandler={sortCostHandler} sortCost={sortCost} />
      <div className="cardContainer">
        {product.map((product) => (
          <Card
            key={product.id}
            product={product}
            addFavoriteProduct={() => addFavoriteProduct(product)}
            favoriteProductsId={favoriteProducts.map(
              (favoriteProduct) => favoriteProduct.id
            )}
          />
        ))}
      </div>
    </>
  );
};
