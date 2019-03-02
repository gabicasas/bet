import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './market.mongo.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {}

  async findAll(): Promise<Market[]> {
    return await this.marketRepository.find();
  }

  async save(markets: Market[]): Promise<Market[]> {
    return await this.marketRepository.save(markets);
  }
}