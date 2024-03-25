import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import userRoute from './routes/user'
import { notFoundHandler, verifyAuthToken } from './middlewares'

const app: express.Application = express()
const address: string = 'localhost:3000'

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('hihi')
})
app.use('/api/users', verifyAuthToken, userRoute)

app.use(notFoundHandler)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
