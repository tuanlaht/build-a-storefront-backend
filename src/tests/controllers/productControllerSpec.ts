import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Test response of product API', () => {
  let token = ''

  beforeAll(async () => {
    const testAccount = {
      firstName: 'Tuan',
      lastName: 'Le Anh',
      username: 'tuanla',
      password_digest: '123456',
    }
    const response = await request.post('/api/users/login').send(testAccount)
    token = response.body
  })

  it('GET /api/products', async () => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('GET /api/products/:id', async () => {
    const response = await request.get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  it('POST /api/products', async () => {
    const newProduct = {
      name: 'New Product',
      price: 100,
    }
    const response = await request.post('/api/products').send(newProduct).set('authorization', token)

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.price).toBe(newProduct.price)
  })
})
