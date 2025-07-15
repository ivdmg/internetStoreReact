import { useState } from "react";
import { Card } from "../../components/ProductCard/Card";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../reduxHooks";
import { Sort } from "../../components/Sort/Sort";
import { Drawer, Pagination, Card as CardAntd } from "antd";
import { SearchParamsProps } from "@/types/types";

export const MainPage = ({ handleChangeFilters, searchParams }: SearchParamsProps) => {
  const { product, loadingMessage } = useAppSelector((state) => state.products);

  const [visibleNavbar, setVisibleNavbar] = useState(false);

  const showNavbarButton = () => {
    setVisibleNavbar(!visibleNavbar);
  };

  return (
    <>
      <Header
        showNavbarButton={showNavbarButton}
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />
      <Drawer
        placement="left"
        onClose={() => setVisibleNavbar(!visibleNavbar)}
        open={visibleNavbar}
      >
        <Navbar
          searchParams={searchParams}
          handleChangeFilters={handleChangeFilters}
        />
      </Drawer>
      <Sort
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />
      <div className="cardBlock">
        {loadingMessage ? (
          <div className="loadingSkeletonContainer">
            {[...Array(5).keys()].map((i) => (
              <CardAntd key={i} loading style={{ minWidth: 270 }} />
            ))}
          </div>
        ) : (
          <div className="cardContainer">
            {product.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        current={searchParams.get("_page") ? Number(searchParams.get("_page")): 1}
        total={12}
        onChange={(page) => handleChangeFilters("_page", String(page))}
      />
      ;
    </>
  );
};
