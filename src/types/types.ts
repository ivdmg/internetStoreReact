export type ProductType = {
  id: number
  brand: string
  name: string
  price: number
  category: string
  rating: number
  quantity: number
  image: string
}

export type SearchParamsProps = {
    handleChangeFilters: (arg1: string, arg2: string) => void
    searchParams: URLSearchParams
}