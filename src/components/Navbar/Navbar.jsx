import "./navbar.scss"
import { Input, Flex } from 'antd';
export const Navbar = ({handleChangeFilters, searchParams}) => {
    const categoryProduct = searchParams.get('category')
    return (
        <>
        <div className="navbar">
            <div onClick={() => handleChangeFilters('category', 'phone')} className={categoryProduct === 'phone' ? 'active' : ''}>Телефоны</div>
            <div onClick={() => handleChangeFilters('category', 'laptop')} className={categoryProduct === 'laptop' ? 'active' : ''}>Ноутбуки</div>
            <div onClick={() => handleChangeFilters('category', 'monitor')} className={categoryProduct === 'monitor' ? 'active' : ''}>Мониторы</div>
        </div>

        <h2>сортировать по цене</h2>
        <div>
            <Flex gap="middle">
                <Input placeholder="от" onChange={(e) => handleChangeFilters('price_gte', e.target.value)} value={searchParams.get('price_gte')}/> -
                <Input placeholder="до" onChange={(e) => handleChangeFilters('price_lte', e.target.value)} value={searchParams.get('price_lte')}/>
            </Flex>
        </div>
        </>
    )
}