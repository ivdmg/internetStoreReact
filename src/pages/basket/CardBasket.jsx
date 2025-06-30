import { DeleteOutlined } from "@ant-design/icons";
import "./basket.css";
import { useDispatch } from "react-redux";
import {
  deleteBasketProductsAsync,
  updateBasketProductsAsync,
} from "./basketSlice";
import { Link } from "react-router-dom";
export const CardBasket = ({ product }) => {
  const { id, image, name, price, brand, quantity } = product;
  const dispatch = useDispatch();

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    dispatch(updateBasketProductsAsync({ ...product, quantity: newQuantity }));
  };

  return (
    <div className="cardBusketItem">
      <div className="cardBusketItemInfo">
        <Link to={`/product/${id}`}>
          <img src={image} alt="" />
        </Link>
        <Link to={`/product/${id}`}>
          <div className="cardBusketContent">
            <b>{brand}</b>
            <div>{name}</div>
          </div>
        </Link>
      </div>
      <div className="cardBusketInteractions">
        <div className="quantityContainer">
          <button onClick={() => updateQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => updateQuantity(quantity + 1)}>+</button>
        </div>
        <b className="cardBusketItemCost">${price * quantity}</b>
        <DeleteOutlined
          className="deleteIcon"
          onClick={() => dispatch(deleteBasketProductsAsync(id))}
        />
      </div>
    </div>
  );
};
