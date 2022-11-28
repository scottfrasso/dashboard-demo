import { UserMeResponseDTO } from '@dashboard/dtos';

import { ApiClient } from './api-client';

export class Users {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  public async me(): Promise<UserMeResponseDTO> {
    return await this.api.callAPI<void, UserMeResponseDTO>('GET', 'users/me');
  }
}
