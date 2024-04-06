import client from '../database'
import type { Product } from '../types'

export class ProductStore {
  async getProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const { rows } = await conn.query(sql)

      conn.release()

      return rows
    } catch (error) {
      throw new Error(`Can not get products. ${error}`)
    }
  }

  async getProductById(productId: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=$1'
      const { rows } = await conn.query(sql, [productId])

      conn.release()

      return rows[0]
    } catch (error) {
      throw new Error(`Can not getProductById. ${error}`)
    }
  }

  async createProduct(product: Omit<Product, 'id'>) {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
      const { rows } = await conn.query(sql, [product.name, product.price])

      conn.release()

      return rows[0]
    } catch (error) {
      throw new Error(`Can not create products. ${error}`)
    }
  }
}
