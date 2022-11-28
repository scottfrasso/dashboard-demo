import axios, { Axios, Method, AxiosRequestConfig } from 'axios'

import { AuthCredentialsDTO } from '@dashboard/dtos'
import { Users } from './users'
import { Auth } from './auth'

export class ApiClient {
  private credentials?: AuthCredentialsDTO
  private readonly axiosClient: Axios

  public readonly users: Users
  public readonly auth: Auth
  constructor(credentials?: AuthCredentialsDTO) {
    this.axiosClient = new Axios()
    this.credentials = credentials

    this.users = new Users(this)
    this.auth = new Auth(this)
  }

  public setCredentials(authToken: string): void {
    this.credentials = { authToken } as AuthCredentialsDTO
  }

  public async callAPI<J, K>(
    method: Method,
    path: string,
    data?: J,
  ): Promise<K> {
    const url = new URL(path, 'http://localhost:3001').href
    const config = {
      method,
      url,
      data,
    } as AxiosRequestConfig<J>

    if (this.credentials) {
      config.headers = {
        ...config.headers,
        Authorization: `bearer ${this.credentials.authToken}`,
      }
    }

    const response = await axios(config)
    return response.data as K
  }
}
