import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { notFoundHandler } from './middlewares'
import orderRoute from './routes/order'
import productRoute from './routes/product'
import userRoute from './routes/user'

const app: express.Application = express()
const address: string = 'localhost:3000'

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('home')
})
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)

app.use(notFoundHandler)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
