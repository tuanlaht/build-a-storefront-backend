import client from '../database'
import bcryptjs from 'bcryptjs'
import type { User } from '../types'

export class UserStore {
  async getUsers(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * from users'
      const { rows } = await conn.query(sql)

      conn.release()

      return rows
    } catch (error) {
      throw new Error(`Can not get users. ${error}`)
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = $1'
      const { rows } = await conn.query(sql, [userId])

      conn.release()

      return rows[0]
    } catch (error) {
      throw new Error(`Can not get user by id. ${error}`)
    }
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    try {
      const { firstName, lastName, username, password_digest } = user
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (firstName, lastName, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

      const hash = bcryptjs.hashSync(
        password_digest + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      )

      const { rows } = await conn.query(sql, [firstName, lastName, username, hash])
      conn.release()

      return rows[0]
    } catch (error) {
      throw new Error(`Can not create user. ${error}`)
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=$1'

    const { rows } = await conn.query(sql, [userName])
    conn.release()

    if (rows.length) {
      const user: User = rows[0]

      if (bcryptjs.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
        return user
      }
    }

    return null
  }
}
