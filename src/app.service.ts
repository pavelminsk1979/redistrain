import { Inject, Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

let name = 1;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemBD: Repository<Item>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Инжектируем кэш-менеджер
  ) {}

  async getItems() {
    const cacheKey1 = 'items1'; // Ключ для кэширования
    // Попытка получить данные из кэша
    const data = await this.cacheManager.get(cacheKey1);
    console.log('data', data);
    if (data) {
      return data;
    }

    const res = await this.itemBD.find();
    console.log('res', res);

    // Сохраняем данные в кэше под ключом
    await this.cacheManager.set(cacheKey1, '12345', 600); // ttl: 600 секунд

    return res;
  }

  async createItem() {
    name = name + 1;
    const newName = `ITEM${name}`;
    const item = new Item();
    item.name = newName;
    return await this.itemBD.save(item);
  }

  async getRed(key: string) {
    console.log('1', key);

    const value = await this.cacheManager.get<string>(key);
    if (value) {
      console.log('2', value);
      return value;
    } else {
      const res = await this.cacheManager.set(key, '6789wertyui', 600);
      console.log('3', res);
      const valueRes = await this.cacheManager.get<string>(key);
      console.log('4', valueRes);
      return valueRes;
    }
  }
}
