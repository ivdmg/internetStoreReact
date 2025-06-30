import { useParams } from "react-router-dom";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "./ProductItemSlice";
import { useEffect } from "react";
export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {image, name, rating, price} = useSelector((state) => state.product.item);


  useEffect(() => {
    dispatch(fetchProductItem(id));
  }, []);

  return (
    <div className="cardItem">
      <img src={image} alt="" />

      <div className="cardContent">
        <div>
          <div>{name}</div>
          <div>рейтинг: {rating}</div>
          <b>${price}</b>
        </div>
        <div className="iconsContainer">
          {/* {addFavoriteProduct && (
            <div
              className="cardFavoriteIcon"
              onClick={() => addFavoriteProduct(product)}
            >
              <FavoriteIcon active={isActiveFavoriteProduct} />
            </div>
          )} */}
          {/* {!isBasketProduct && (
            <ShoppingCartOutlined
              className="basketIcon"
              onClick={() => addProductToBasket(product)}
              style={{ color: isActiveBasketProduct ? "red" : "inherit" }}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
