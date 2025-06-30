export const Navbar = ({changeCategoryProduct, categoryProduct}) => {
    return (
        <div className="navbar">
            <div onClick={() => changeCategoryProduct('phone')} className={categoryProduct === 'phone' ? 'active' : ''}>Телефоны</div>
            <div onClick={() => changeCategoryProduct('laptop')} className={categoryProduct === 'laptop' ? 'active' : ''}>Ноутбуки</div>
            <div onClick={() => changeCategoryProduct('monitor')} className={categoryProduct === 'monitor' ? 'active' : ''}>Мониторы</div>
        </div>
    )
}