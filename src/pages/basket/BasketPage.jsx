import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { CardBasket } from "./CardBasket";


export const BasketPage = () => {
  const basketProducts = useSelector((state) => state.basket.products);

  return (
    <>
      <div className="cardContainer">
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
      <Link to="/" className="linkToMainPage">
        <h1>вернуться на главную</h1>
      </Link>
    </>
  );
};
