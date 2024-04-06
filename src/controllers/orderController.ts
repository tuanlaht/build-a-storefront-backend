import { Request, Response } from 'express'
import { OrderStore } from '../models/orders'
import { getUserIdFromToken } from '../utils'
import { InputProduct } from '../types'

const orderStore = new OrderStore()

export const read = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params as unknown as { userId: number }
    const orders = await orderStore.getOrdersWithProducts(userId)
    if (!orders.length) {
      res.json(null)
      return
    }
    res.json(orders)
  } catch (error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization
    const token = authorizationHeader ? authorizationHeader : ''

    const products = req.body as unknown as InputProduct[]
    const userId = getUserIdFromToken(token)

    const responseOrder = await orderStore.create(userId as number, products)

    res.status(201).json(responseOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}
