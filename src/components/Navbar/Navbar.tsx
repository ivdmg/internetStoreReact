import { debounce } from "lodash";
import "./navbar.scss"
import { Input, Flex } from 'antd';
import { SearchParamsProps } from "@/types/types";

export const Navbar = ({handleChangeFilters, searchParams}: SearchParamsProps) => {
    const categoryProduct = searchParams.get('category')
    const debounceHandlerPrice = debounce((key: string, value: string) => handleChangeFilters(key, value), 700, []);
    
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
                <Input placeholder="от" onChange={(e) => debounceHandlerPrice('price_gte', e.target.value)} defaultValue={searchParams.get('price_gte') || ''}/> -
                <Input placeholder="до" onChange={(e) => debounceHandlerPrice('price_lte', e.target.value)} defaultValue={searchParams.get('price_lte') || ''}/>
            </Flex>
        </div>
        </>
    )
}