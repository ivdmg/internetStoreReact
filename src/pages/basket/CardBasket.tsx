import { DeleteOutlined } from "@ant-design/icons";
import "./basket.scss";
import { useAppDispatch } from "../../reduxHooks";
import {
  deleteBasketProductsAsync,
  updateBasketProductsAsync,
} from "./basketSlice";
import { Link } from "react-router-dom";
import { ProductType } from "@/types/types";

export const CardBasket = ({ product }: {product: ProductType}) => {
  const { id, image, name, price, brand, quantity } = product;
  const dispatch = useAppDispatch();

  const updateQuantity = (quantity: number) => {
    if (quantity < 1) {
      return;
    }
    dispatch(updateBasketProductsAsync({ ...product, quantity: quantity }));
  };

  return (
    <div className="cardBusketItem">
      <div className="cardBusketItemInfo">
        <Link className='link' to={`/product/${id}`}>
          <img src={image} alt="" />
        </Link>
        <Link className='link' to={`/product/${id}`}>
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
