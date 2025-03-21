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

  // это тестовый эндпоинт
  //я в черной кансоле создал SET 12345 helloy

  //для подключения РЕДИСА с моим приложением я ожидаю
  // на этом эндпоинте по ключу '12345' получить
  //  в браузере значение  'helloy'
  @Get('red')
  async getRed() {
    const key = '12345';
    return this.appService.getRed(key);
  }
}
