import { FavoriteIcon } from "./FavoriteIcon";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../App.css";
import { Link } from "react-router-dom";

export const Card = ({
  product,
  addFavoriteProduct,
  favoriteProductsId = [],
  addProductToBasket,
  basketProductsId = [],
  isBasketProduct,
}) => {
  const { id, image, name, price, rating } = product;
  const isActiveFavoriteProduct = favoriteProductsId.includes(id);
  const isActiveBasketProduct = basketProductsId.includes(id);
  return (
    <div className="cardItem">
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>

      <div className="cardContent">
        <Link to={`/product/${id}`}>
          <div>
            <div>{name}</div>
            <div>рейтинг: {rating}</div>
            <b>${price}</b>
          </div>
        </Link>
        <div className="iconsContainer">
          {addFavoriteProduct && (
            <div
              className="cardFavoriteIcon"
              onClick={() => addFavoriteProduct(product)}
            >
              <FavoriteIcon active={isActiveFavoriteProduct} />
            </div>
          )}
          {!isBasketProduct && (
            <ShoppingCartOutlined
              className="basketIcon"
              onClick={() => addProductToBasket(product)}
              style={{ color: isActiveBasketProduct ? "red" : "inherit" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
