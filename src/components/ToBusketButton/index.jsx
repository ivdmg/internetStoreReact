import { useDispatch, useSelector } from "react-redux";
import { addBasketProductsAsync, deleteBasketProductsAsync } from "../../pages/basket/basketSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const ToBusketButton = ({ product }) => {
  const dispatch = useDispatch();
  const basketProducts = useSelector((state) => state.basket.products);
  
  const isInBasket = basketProducts.some(item => item.id === product.id);

  const handleClick = () => {
    if (isInBasket) {
      dispatch(deleteBasketProductsAsync(product.id));
    } else {
      dispatch(addBasketProductsAsync(product));
    }
  };

  return (
    <ShoppingCartOutlined
      className="basketIcon"
      onClick={handleClick}
      style={{ color: isInBasket ? "red" : "inherit" }}
    />
  );
};