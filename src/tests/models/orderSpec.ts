import { OrderStore } from '../../models/orders'

describe('OrderStore', () => {
  const orderStore = new OrderStore()

  it('should have a getOrdersWithProducts method', () => {
    expect(orderStore.getOrdersWithProducts).toBeDefined()
  })

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined()
  })

  describe('getOrdersWithProducts method', () => {
    it('should return orders', async () => {
      const userId = 1
      const result = await orderStore.getOrdersWithProducts(userId)
      expect(result[0].id).toBeTruthy()
    })
  })

  describe('create method', () => {
    it('should create an order with input products', async () => {
      const userId = 1 // Assuming there's a user with ID 1 for testing
      const products = [{ id: 1, quantity: 2, price: 100, name: 'Product 1' }] // Assuming there's a product with ID 1 for testing

      const result = await orderStore.create(userId, products)
      expect(result.products).toEqual(products)
    })
  })
})
