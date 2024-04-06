export type Product = {
  id: number
  name: string
  price: number
}

export interface InputProduct extends Product {
  quantity: number
}
