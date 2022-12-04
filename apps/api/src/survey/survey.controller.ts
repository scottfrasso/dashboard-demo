import { Controller, Post, Body, UseGuards } from '@nestjs/common'

import { SurveyDTO } from '@dashboard/dtos'

import { Public } from '../decorators/ispublic'

@Controller('survey')
export class SurveyController {
  @Public()
  @Post()
  async create(@Body() survey: SurveyDTO): Promise<void> {
    console.log(`Survey: ${JSON.stringify(survey)}`)
  }
}
