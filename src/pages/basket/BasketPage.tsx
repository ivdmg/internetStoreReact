import { useAppSelector } from "../../reduxHooks";
import { CardBasket } from "./CardBasket";
import './basket.scss'
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';

export const BasketPage = () => {
  const basketProducts = useAppSelector((state) => state.basket.products);

  return (
    <>
      <div className="cardContainerBasket">
        {basketProducts.length ? (
          basketProducts.map((product) => (
            <CardBasket key={product.id} product={product} />
          ))
        ) : (
          <div>у вас нет товаров в корзине</div>
        )}
      </div>
      <h3 className="summaryCostProducts">
        Итоговая цена: &nbsp;&nbsp;$
        {basketProducts.reduce(
          (acc, product) => (acc += product.price * product.quantity), 0
        )}
      </h3>
      <ButtonBack/>
    </>
  );
};
