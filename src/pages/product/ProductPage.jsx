import { Link, useParams } from "react-router-dom";
import styles from "./product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "./ProductItemSlice";
import { useEffect } from "react";
import { ToBusketButton } from "../../components/ToBusketButton/index";
import { Comments } from './comments/Comments';

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
    <>
      <div className={styles.cardItem}>
        <img src={image} alt={name} />

        <div className={styles.cardContent}>
          <div>
            <div>{name}</div>
            <div>рейтинг: {rating}</div>
            <b>${price}</b>
          </div>
          <div className={styles.iconsContainer}>
            <ToBusketButton product={productItem} />
          </div>
        </div>
      </div>
      <Comments productId={id}/>
      <Link to="/" className="linkToMainPage">
        <h1>вернуться на главную</h1>
      </Link>
    </>
  );
};
