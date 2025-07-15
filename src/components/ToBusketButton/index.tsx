import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { addBasketProductsAsync, deleteBasketProductsAsync } from "../../pages/basket/basketSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ProductType } from "@/types/types";

export const ToBusketButton = ({ product }: {product: ProductType}) => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector((state) => state.basket.products);
  
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