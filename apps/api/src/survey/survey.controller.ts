import { Controller, Post, Body, UseGuards } from '@nestjs/common'

import { SurveyDTO } from '@dashboard/dtos'

import { Public } from '../decorators/ispublic'
import { SurveyService } from './survey.service'

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}
  @Public()
  @Post()
  async create(@Body() survey: SurveyDTO): Promise<void> {
    console.log(`Survey: ${JSON.stringify(survey)}`)

    await this.surveyService.submitSurveyResults(survey)
  }
}
