import { useParams } from "react-router-dom";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "./ProductItemSlice";
import { useEffect } from "react";
import { ToBusketButton } from "../../components/ToBusketButton/index";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const productItem = useSelector((state) => state.product.item);
  const { image, name, rating, price } = productItem || {};

  useEffect(() => {
    dispatch(fetchProductItem(id));
  }, []);

  if (!productItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cardItem">
      <img src={image} alt={name} />

      <div className="cardContent">
        <div>
          <div>{name}</div>
          <div>рейтинг: {rating}</div>
          <b>${price}</b>
        </div>
        <div className="iconsContainer">
          <ToBusketButton product={productItem} />
        </div>
      </div>
    </div>
  );
};