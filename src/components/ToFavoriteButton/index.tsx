import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  addFavoriteProductsAsync,
  deleteFavoriteProductsAsync,
} from "../../pages/favorite/favoriteSlice";
import { ProductType } from "@/types/types";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";

export const ToFavoriteButton = ({ product }: {product: ProductType}) => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector((state) => state.favorites.favorite);
  
  const isActive = favoriteProducts.some(item => item.id === product.id);

  const handleClick = () => {
    if (isActive) {
      dispatch(deleteFavoriteProductsAsync(product.id));
    } else {
      dispatch(addFavoriteProductsAsync(product));
    }
  };

  return (
    <div
      className="cardFavoriteIcon"
      onClick={handleClick}
    >
      <FavoriteIcon active={isActive} />
    </div>
  );
};