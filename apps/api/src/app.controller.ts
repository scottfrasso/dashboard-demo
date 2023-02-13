import { Controller, Get } from '@nestjs/common'
import { Public } from './decorators'

@Controller()
export class AppController {
  @Get()
  @Public()
  getHello(): { message: string } {
    return {
      message: 'I am healthy',
    }
  }
}
