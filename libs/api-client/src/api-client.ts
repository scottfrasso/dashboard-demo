import { Axios, Method, AxiosRequestConfig } from 'axios'

import { AuthCredentialsDTO } from '@dashboard/dtos'

export class ApiClient {
  private credentials?: AuthCredentialsDTO
  private readonly axiosClient: Axios
  constructor(credentials?: AuthCredentialsDTO) {
    this.axiosClient = new Axios()
    this.credentials = credentials
  }

  public setCredentials(credentials: AuthCredentialsDTO): void {
    this.credentials = credentials
  }

  public async callAPI<J, K>(
    method: Method,
    url: string,
    data?: J,
  ): Promise<K> {
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

    const response = await this.axiosClient.request(config)

    return response.data as K
  }
}
