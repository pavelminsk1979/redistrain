import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

let name = 1;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemBD: Repository<Item>,
  ) {}

  async getItems() {
    return await this.itemBD.find();
  }

  async createItem() {
    name = name + 1;
    const newName = `ITEM${name}`;
    const item = new Item();
    item.name = newName;
    return await this.itemBD.save(item);
  }
}
