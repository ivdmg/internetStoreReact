import { useState } from "react";
import { Card } from "../../components/ProductCard/Card";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { Sort } from "../../components/Sort/Sort";
import { Drawer, Pagination } from 'antd';

export const MainPage = ({
  inputSearctHandler,
  changeCategoryProduct,
  categoryProduct,
  sortCostHandler,
  sortCost,
  setPriceFromToFilter,
  priceFromToFilter,
  setPage,
  page,
  handleChangeFilters,
  searchParams,
}) => {
  const { product, loadingMessage } = useSelector((state) => state.products);

  const [visibleNavbar, setVisibleNavbar] = useState(false);

  const showNavbarButton = () => {
    setVisibleNavbar(!visibleNavbar);
  };

  return (
    <>
      <Header
        inputSearctHandler={inputSearctHandler}
        showNavbarButton={showNavbarButton}
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />
      {loadingMessage && <h1>Loading...</h1>}
      <Drawer
        placement='left'
        onClose={() => setVisibleNavbar(!visibleNavbar)}
        open={visibleNavbar}>
        <Navbar
        searchParams={searchParams}
        handleChangeFilters={handleChangeFilters}
          changeCategoryProduct={changeCategoryProduct}
          categoryProduct={categoryProduct}
          setPriceFromToFilter={setPriceFromToFilter}
          priceFromToFilter={priceFromToFilter}
        />
      </Drawer>
      <Sort sortCostHandler={sortCostHandler} sortCost={sortCost} handleChangeFilters={handleChangeFilters} searchParams={searchParams}/>
      <div className="cardContainer">
        {product.map((product) => (
          <Card
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <Pagination current={searchParams.get('_page')} total={12} onChange={(page) => handleChangeFilters('_page', page)}/>;
    </>
  );
};
