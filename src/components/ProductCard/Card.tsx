import "./card.scss";
import { Link } from "react-router-dom";
// @ts-ignore
import { ToBusketButton } from '../ToBusketButton/index';
// @ts-ignore
import { ToFavoriteButton } from '../ToFavoriteButton/index';
import { memo } from "react";
import { ProductType } from "@/types/types";

type Props = {
  product: ProductType
}
export const Card = memo(({product}: Props) => {
  const { id, image, name, price, rating } = product;
  console.log('render card')
  return (
    <div className="cardItem">
      <Link className='link' to={`/product/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <div className="cardContent">
        <Link className='link' to={`/product/${id}`}>
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
})