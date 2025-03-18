import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getItems() {
    return this.appService.getItems();
  }

  @Get('create')
  createItem() {
    return this.appService.createItem();
  }
}
