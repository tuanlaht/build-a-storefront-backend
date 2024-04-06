import { Router } from 'express'
import { create, read } from '../controllers/orderController'
import { verifyAuthToken } from '../middlewares'

const orderRoute = Router()

orderRoute.get('/:userId', verifyAuthToken, read)
orderRoute.post('/', verifyAuthToken, create)

export default orderRoute
