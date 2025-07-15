import { Link } from "react-router-dom";
import { Card } from "../../components/ProductCard/Card";
import { useAppSelector } from "../../reduxHooks";
import { ButtonBack } from "../../components/ButtonBack/ButtonBack";

export const FavoritePage = () => {
  const favoriteProducts = useAppSelector((state) => state.favorites.favorite);

  return (
    <>
      <div className="cardContainer">
        {favoriteProducts.length ? (
          favoriteProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div>у вас нет избранных элементов</div>
        )}
      </div>
      <ButtonBack/>
    </>
  );
};