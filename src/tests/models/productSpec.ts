import { ProductStore } from '../../models/product'
import { Product } from '../../types'

const productStore: ProductStore = new ProductStore()

describe('ProductStore', () => {
  it('should have a getProducts method', () => {
    expect(productStore.getProducts).toBeDefined()
  })

  it('should have a getProductById method', () => {
    expect(productStore.getProductById).toBeDefined()
  })

  it('should have a createProduct method', () => {
    expect(productStore.createProduct).toBeDefined()
  })

  describe('ProductStore methods', () => {
    it('should get products from the database', async () => {
      const products: Product[] = await productStore.getProducts()
      expect(products).toBeDefined()
    })

    it('should get a product by ID from the database', async () => {
      const productId = 1
      const product: Product = await productStore.getProductById(productId)
      expect(product).toBeDefined()
    })

    it('should create a product in the database', async () => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'Banana',
        price: 48000,
      }
      const createdProduct: Product = await productStore.createProduct(newProduct)
      expect(createdProduct).toBeDefined()
    })
  })
})
