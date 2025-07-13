import { Link } from "react-router-dom";
import { Card } from "../../components/ProductCard/Card";
import { useSelector } from "react-redux";

export const FavoritePage = () => {
  const favoriteProducts = useSelector((state) => state.favorites.favorite);

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
      <Link to="/" className="linkToMainPage">
        <h1>вернуться на главную</h1>
      </Link>
    </>
  );
};