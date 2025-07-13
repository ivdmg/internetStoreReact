import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteProductsAsync,
  deleteFavoriteProductsAsync,
} from "../../pages/favorite/favoriteSlice";

export const ToFavoriteButton = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favorites.favorite);
  
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