import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaClient } from '@prisma/client'
import { AuthCredentialsDTO, JWTPayload, SurveyDTO } from '@dashboard/dtos'

import { SurveyFavoriteColorEnumDBO } from '../data'
import { PRISMA_PROVIDER_NAME } from '../provider-names'

@Injectable()
export class SurveyService {
  constructor(
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  async submitSurveyResults(survey: SurveyDTO): Promise<void> {
    await this.prismaClient.surveyResponse.create({
      data: {
        number: survey.favoriteNumber,
        color: survey.favoriteColor
          .toString()
          .toUpperCase() as SurveyFavoriteColorEnumDBO,
      },
    })
  }
}
