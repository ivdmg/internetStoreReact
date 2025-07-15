import { Link } from "react-router-dom";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import './header.scss'
import { Button, Input, Modal } from "antd";
import { debounce } from "lodash";
import { useAppSelector } from "../../reduxHooks";
import { useState } from "react";
import { Login } from "./Login/Login";

type Props = {
showNavbarButton: () => void
handleChangeFilters: (arg1: string, arg2: string) => void 
searchParams: URLSearchParams
}

export const Header = ({ showNavbarButton, handleChangeFilters, searchParams }: Props) => {
  const debounceHandler = debounce((key: string, value: string) => handleChangeFilters(key, value), 700, []);
  const filterIsActive = searchParams.get('category') || 
  searchParams.get('price_gte') ||
  searchParams.get('price_lte');
  const basketProductsQuantity = useAppSelector(state => state.basket.products.length);
  const favoriteProductsQuantity = useAppSelector(state => state.favorites.favorite.length);;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="header">
      <Button style={{width: '50px'}} type="text" onClick={() => setOpenModal(true)}><UserOutlined style={{fontSize: 35, color: '#fff', marginRight: 0}}/></Button>
      <div>
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png"
          alt=""
          className="headerLogo"
        />
      </div>
      <div className="burgerContainer">
        {filterIsActive &&<div className="iconBurgerFilters"/>}
        <div onClick={showNavbarButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g transform="scale(5.12,5.12)">
                <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <Input type="text" onChange={(e) => debounceHandler('q', e.target.value)} defaultValue={searchParams.get('q') || ''} />
      <Link className='link' to="/basket">
        <div className="basketIconWrapper">
          {!!basketProductsQuantity && <div className="basketProductsQuantity">{basketProductsQuantity}</div> }
          <ShoppingCartOutlined className="basketIcon" style={{margin: 0}}/>
        </div>
      </Link>
      <Link className='link' to="/favorite">
        <div className="favoriteIconWrapper">
          {!!favoriteProductsQuantity && <div className="favoriteProductsQuantity">{favoriteProductsQuantity}</div> }
          <FavoriteIcon className="headerFavoriteIcon"/>
        </div>
      </Link>
      {openModal && 
      <Modal
          footer={null}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={openModal}
          onCancel={() => setOpenModal(false)}
        >
        <Login/>
        </Modal>}
    </div>
    );
};
