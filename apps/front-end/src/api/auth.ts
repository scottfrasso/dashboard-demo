import { AuthCredentialsDTO, LoginDTO } from '@dashboard/dtos'

import { ApiClient } from './api-client'

export class Auth {
  private readonly api: ApiClient
  constructor(api: ApiClient) {
    this.api = api
  }

  public async login(loginDTO: LoginDTO): Promise<AuthCredentialsDTO> {
    const credentials = await this.api.callAPI<LoginDTO, AuthCredentialsDTO>(
      'POST',
      'auth/login',
      loginDTO,
    )
    this.api.setCredentials(credentials.authToken)
    return credentials
  }
}
