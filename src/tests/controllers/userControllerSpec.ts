import supertest from 'supertest'
import app from '../../server'
import { getUserIdFromToken } from '../../utils'

const request = supertest(app)

let testAccount = {
  firstName: 'Tuan',
  lastName: 'Le Anh',
  username: 'tuanla',
  password_digest: '123456',
}

let token = ''

describe('Test response of user API', () => {
  beforeAll(async () => {
    await request.post('/api/users').send(testAccount)
    const response = await request.post('/api/users/login').send(testAccount)

    token = response.body
  })

  it('GET /api/users', async () => {
    const response = await request.get('/api/users').set('authorization', token)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('GET /api/users/1', async () => {
    const response = await request.get('/api/users/1').set('authorization', token)
    expect(response.status).toBe(200)
    expect(response.body.username).toBeDefined()
  })

  it('POST /api/users', async () => {
    let newAccount = {
      firstName: 'Nguyen',
      lastName: 'Van A',
      username: 'jasminee',
      password_digest: '123456',
    }
    const response = await request.post('/api/users').send(newAccount)
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
  })

  it('POST /api/users/login', async () => {
    const response = await request.post('/api/users/login').send(testAccount)
    let userId = getUserIdFromToken(response.body)
    expect(userId).toBeDefined()
  })
})
