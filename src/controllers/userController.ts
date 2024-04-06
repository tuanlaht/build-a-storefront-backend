import type { User } from '../types'
import { UserStore } from '../models/user'
import { Request, Response } from 'express'
import jsonwebtoken, { Secret } from 'jsonwebtoken'

const userStore = new UserStore()

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userStore.getUsers()
    res.json(users)
  } catch (error) {
    console.log('error', error)
    res.status(400).json(error)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, username, password_digest } = req.body as unknown as User

    const result = await userStore.createUser({
      firstName,
      lastName,
      username,
      password_digest,
    })

    res.status(201).json(result)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as unknown as Pick<User, 'id'>
    const user = await userStore.getUserById(id)
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const authenticate = async (req: Request, res: Response) => {
  try {
    const username = req.body.username as unknown as string
    const password = req.body.password_digest as unknown as string

    const user: User | null = await userStore.authenticate(username, password)

    if (!user) {
      return res.status(400).send('Username or password is not match')
    }

    res.json(jsonwebtoken.sign({ user }, process.env.TOKEN_KEY as Secret))
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}
