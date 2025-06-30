import "../App.css";
import { Link } from "react-router-dom";
import { ToBusketButton } from './ToBusketButton';
import { ToFavoriteButton } from './ToFavoriteButton';

export const Card = ({ product }) => {
  const { id, image, name, price, rating } = product;

  return (
    <div className="cardItem">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <div className="cardContent">
        <Link to={`/product/${id}`}>
          <div>
            <div>{name}</div>
            <div>рейтинг: {rating}</div>
            <b>${price}</b>
          </div>
        </Link>
        <div className="iconsContainer">
          <ToFavoriteButton product={product} />
          <ToBusketButton product={product} />
        </div>
      </div>
    </div>
  );
};