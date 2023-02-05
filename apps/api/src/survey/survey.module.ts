import { Module } from '@nestjs/common'

import { DataModule } from '../data/data.module'
import { SurveyController } from './survey.controller'
import { SurveyService } from './survey.service'

@Module({
  imports: [DataModule],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
