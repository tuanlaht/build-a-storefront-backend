import { InputProduct } from './product'

export type Order = {
  id: number
  user_id: number
  status: 'active' | 'complete'
}

export interface ResponseOrder {
  id: number
  status: 'active' | 'complete'
  products: InputProduct[]
}
