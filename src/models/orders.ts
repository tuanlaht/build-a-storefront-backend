import client from '../database'
import type { InputProduct, Order, ResponseOrder } from '../types'

export class OrderStore {
  async getOrdersWithProducts(userId: number): Promise<ResponseOrder[]> {
    const ordersQueryText = `
          SELECT id, status
          FROM orders
          WHERE user_id = $1;
        `
    const productsQueryText = `
          SELECT 
            op.order_id, 
            op.id, 
            p.name AS name, 
            p.price AS price, 
            op.quantity 
          FROM order_products op
          INNER JOIN products p ON op.product_id = p.id
          WHERE op.order_id = ANY($1);
        `

    try {
      const conn = await client.connect()
      const ordersRes = await conn.query(ordersQueryText, [userId])
      const orders: Order[] = ordersRes.rows

      if (orders.length === 0) {
        return []
      }

      const orderIds = orders.map(order => order.id)
      const productsRes = await conn.query(productsQueryText, [orderIds])
      const products: (InputProduct & { order_id: number })[] = productsRes.rows

      const ordersWithProducts = orders.map(order => ({
        id: order.id,
        status: order.status,
        products: products
          .filter(product => product.order_id === order.id)
          .map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
      }))

      return ordersWithProducts
    } catch (err) {
      throw new Error(`Error fetching orders for user ID ${userId}: ${err}`)
    }
  }

  async create(userId: number, products: InputProduct[]): Promise<ResponseOrder> {
    try {
      const conn = await client.connect()

      const orderSql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
      const orderProductSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3);'
      const orderResult = await conn.query(orderSql, [userId, 'active'])

      const orderId: number = orderResult.rows[0].id

      for (const product of products) {
        const { id, quantity } = product
        await conn.query(orderProductSql, [orderId, id, quantity])
      }

      conn.release()

      return {
        id: orderId,
        status: 'active',
        products: products,
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Can not create products. ${error}`)
    }
  }
}
