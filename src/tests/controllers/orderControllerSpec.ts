import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Test response of order API', () => {
  let token = ''

  const testAccount = {
    firstName: 'Tuan',
    lastName: 'Le Anh',
    username: 'tuanla',
    password_digest: '123456',
  }

  const newProduct = {
    name: 'New Product',
    price: 100,
  }

  const newOrder = [
    {
      id: 1,
      name: 'New Product',
      price: 100,
      quantity: 5,
    },
  ]

  beforeAll(async () => {
    await request.post('/api/users').send(testAccount)
    const response = await request.post('/api/users/login').send(testAccount)
    token = response.body

    await request.post('/api/products').send(newProduct).set('authorization', token)
    await request.post('/api/orders').send(newOrder).set('authorization', token)
  })

  it('GET /api/orders/:userId', async () => {
    const response = await request.get('/api/orders/1').set('authorization', token)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  it('POST /api/orders', async () => {
    const response = await request.post('/api/orders').send(newOrder).set('authorization', token)
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
  })
})
