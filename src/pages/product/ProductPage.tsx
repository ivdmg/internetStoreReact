import { Link, useParams } from "react-router-dom";
import styles from "./product.module.scss";
import { useAppDispatch, useAppSelector } from ".././../reduxHooks";
import { fetchProductItem } from "./ProductItemSlice";
import { useEffect } from "react";
import { ToBusketButton } from "../../components/ToBusketButton/index";
import { Comments } from './comments/Comments';
import { ButtonBack } from "../../components/ButtonBack/ButtonBack";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const productItem = useAppSelector((state) => state.product.item);
  const { image, name, rating, price } = productItem || {};

  useEffect(() => {
    if(id){
      dispatch(fetchProductItem(id));
    }
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
      <ButtonBack/>
    </>
  );
};
