import { Injectable } from '@nestjs/common'

import { UserMeResponseDTO } from '@dashboard/dtos'

@Injectable()
export class UsersService {
  private readonly users: UserMeResponseDTO[] = [
    {
      id: '123',
      role: 'admin',
      email: 'scott@example.com',
      fullName: 'Scott F.',
    },
  ]

  async findOneByEmail(email: string): Promise<UserMeResponseDTO | undefined> {
    return this.users.find((user) => user.email === email)
  }
}
