import { GroupDTO } from '@dashboard/dtos'

import { ApiClient } from './api-client'

export class Groups {
  private readonly api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  public async getGroups(): Promise<GroupDTO[]> {
    return await this.api.callAPI<void, GroupDTO[]>('GET', 'groups')
  }
}
