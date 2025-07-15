import { URLSearchParams } from "url"
import "./sort.scss"
import { SearchParamsProps } from "@/types/types"

export const Sort = ({handleChangeFilters, searchParams}: SearchParamsProps) => {
    const selectedCost = searchParams.get('_order')
    return(
        <div className="sort-bar">
            <span>Сортировать по:</span>
            <span onClick={() => handleChangeFilters('_order','asc')} className = {selectedCost === 'asc' ? 'sortActive' : ''}>возрастанию</span>
            <span onClick={() => handleChangeFilters('_order','desc')} className = {selectedCost === 'desc' ? 'sortActive' : ''}>убыванию</span>
        </div>
    )
}