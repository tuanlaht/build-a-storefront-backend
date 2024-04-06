import { UserStore } from '../../models/user'
import { User } from '../../types'

const userStore: UserStore = new UserStore()

describe('UserStore', () => {
  it('should have a getUsers method', () => {
    expect(userStore.getUsers).toBeDefined()
  })

  it('should have a getUserById method', () => {
    expect(userStore.getUserById).toBeDefined()
  })

  it('should have a createUser method', () => {
    expect(userStore.createUser).toBeDefined()
  })

  it('should have an authenticate method', () => {
    expect(userStore.authenticate).toBeDefined()
  })

  describe('UserStore methods', () => {
    it('should get users from the database', async () => {
      const users: User[] = await userStore.getUsers()
      expect(users).toBeDefined()
    })

    it('should get a user by ID from the database', async () => {
      const userId = 1
      const user: User = await userStore.getUserById(userId)
      expect(user).toBeDefined()
    })

    it('should create a user in the database', async () => {
      const newUser: Omit<User, 'id'> = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password_digest: 'password',
      }
      const createdUser: User = await userStore.createUser(newUser)
      expect(createdUser).toBeDefined()
    })

    it('should authenticate a user with valid credentials', async () => {
      const userName = 'johndoe'
      const password = 'password'
      const authenticatedUser: User | null = await userStore.authenticate(userName, password)
      expect(authenticatedUser).toBeDefined()
    })

    it('should return null for authentication with invalid credentials', async () => {
      const userName = 'invalidusername'
      const password = 'invalidpassword'
      const authenticatedUser: User | null = await userStore.authenticate(userName, password)
      expect(authenticatedUser).toBeNull()
    })
  })
})
