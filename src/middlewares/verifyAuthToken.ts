import jsonwebtoken, { Secret } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization
    const token = authorizationHeader ? authorizationHeader : ''
    jsonwebtoken.verify(token, process.env.TOKEN_KEY as Secret)

    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}
