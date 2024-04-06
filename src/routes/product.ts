import { Router } from 'express'
import { verifyAuthToken } from '../middlewares'
import { index, create, read } from '../controllers/productController'

const productRoute = Router()

productRoute.get('/', index)
productRoute.get('/:id', read)
productRoute.post('/', verifyAuthToken, create)

export default productRoute
