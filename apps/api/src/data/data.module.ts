import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { PRISMA_PROVIDER_NAME } from '../provider-names'

@Module({
  providers: [
    {
      provide: PRISMA_PROVIDER_NAME,
      useFactory: () => {
        return new PrismaClient()
      },
    },
  ],
  exports: [PRISMA_PROVIDER_NAME],
})
export class DataModule {}
