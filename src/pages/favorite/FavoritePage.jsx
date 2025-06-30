import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteProductsAsync,
  deleteFavoriteProductsAsync,
} from "./favoriteSlice";
import {
  addBasketProductsAsync,
  deleteBasketProductsAsync,
} from "../basket/basketSlice";
export const FavoritePage = () => {
  const favoriteProducts = useSelector((state) => state.favorites.favorite);
  const basketProducts = useSelector((state) => state.basket.products);

  const dispatch = useDispatch();

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

  const addProductToBasket = (product) => {
    if (
      basketProducts.some((basketProduct) => basketProduct.id === product.id)
    ) {
      dispatch(deleteBasketProductsAsync(product.id));
    } else {
      dispatch(addBasketProductsAsync(product));
    }
  };

  return (
    <>
      <div className="cardContainer">
        {favoriteProducts.length ? (
          favoriteProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              addFavoriteProduct={() => addFavoriteProduct(product)}
              favoriteProductsId={favoriteProducts.map(
                (favoriteProduct) => favoriteProduct.id
              )}
              addProductToBasket={() => addProductToBasket(product)}
              basketProductsId={basketProducts.map(
                (basketProduct) => basketProduct.id
              )}
              isBasketProduct={false}
            />
          ))
        ) : (
          <div>у вас нет избранных элементов</div>
        )}
      </div>
      <Link to="/" className="linkToMainPage">
        <h1>вернуться на главную</h1>
      </Link>
    </>
  );
};
