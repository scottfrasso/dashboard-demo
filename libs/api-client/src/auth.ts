import { AuthCredentialsDTO, LoginDTO } from '@dashboard/dtos'

import { ApiClient } from './api-client'

export class Auth {
  private readonly api: ApiClient
  constructor(api: ApiClient) {
    this.api = api
  }

  public async login(loginDTO: LoginDTO): Promise<AuthCredentialsDTO> {
    return this.api.callAPI('POST', 'auth/login', loginDTO)
  }
}
