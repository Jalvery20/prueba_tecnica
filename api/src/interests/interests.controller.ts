import { Controller, Get } from '@nestjs/common';
import { InterestsService } from './interests.service';

@Controller('api/Intereses')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get('Listado')
  async getInterestsList() {
    return this.interestsService.getInterestsList();
  }
}
