import { Injectable } from '@nestjs/common'

export type User = {
  id: number
  email: string
  name: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'scott@example.com',
      name: 'Scott',
      password: 'password',
    },
  ]

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }
}
