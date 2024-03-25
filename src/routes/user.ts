import { Router } from 'express'
import { index, create, read } from '../controllers/userController'

const userRoute = Router()

userRoute.get('/', index)
userRoute.get('/:id', read)
userRoute.post('/', create)

export default userRoute
