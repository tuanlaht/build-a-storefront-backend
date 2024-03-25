import { Request, Response } from 'express'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).send('404 Not Found: The requested resource was not found on this server.')
}
