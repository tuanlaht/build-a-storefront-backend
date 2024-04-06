import { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import type { Product } from '../types'

const productStore = new ProductStore()

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: Product[] = await productStore.getProducts()
    res.json(products)
  } catch (error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as unknown as { id: number }
    const user = await productStore.getProductById(id)

    if (!user) {
      res.json(null)
      return
    }
    res.json(user)
  } catch (error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price } = req.body as unknown as Omit<Product, 'id'>
    const result = await productStore.createProduct({ name, price })

    res.status(201).json(result)
  } catch (error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}
