import "./sort.css"
export const Sort = ({sortCostHandler, sortCost}) => {
    return(
        <div className="sort-bar">
            <span>Сортировать по:</span>
            <span onClick={() => sortCostHandler('asc')} className = {sortCost === 'asc' ? 'sortActive' : ''}>возрастанию</span>
            <span onClick={() => sortCostHandler('desc')} className = {sortCost === 'desc' ? 'sortActive' : ''}>убыванию</span>
        </div>
    )
}