import type { User } from '../types'
import { UserStore } from '../models/user'
import { Request, Response } from 'express'

const userStore = new UserStore()

export const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await userStore.getUser()
    res.json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, password_digest } = req.body as unknown as User

    const result = await userStore.createUser({
      firstName,
      lastName,
      userName,
      password_digest,
    })

    res.status(201).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as Pick<User, 'id'>
    const user = await userStore.getUserById(id)
    console.log('123', user)
    res.json('123123')
  } catch (error) {
    res.status(400).json(error)
  }
}
