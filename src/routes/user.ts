import { Router } from 'express'
import { authenticate, create, index, read } from '../controllers/userController'
import { verifyAuthToken } from '../middlewares'

const userRoute = Router()

userRoute.get('/', verifyAuthToken, index)
userRoute.get('/:id', verifyAuthToken, read)
userRoute.post('/', create)
userRoute.post('/login', authenticate)

export default userRoute
