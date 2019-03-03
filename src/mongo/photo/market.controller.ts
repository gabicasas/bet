import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from './market.mongo.entity';
import { BetfairService } from 'betfair/betfair.service';


@Controller('market')
export class MarketController {

  private readonly logger = new Logger(MarketController.name);


  constructor(private readonly marketService: MarketService, private betfair: BetfairService) {}

  @Get()
  findAll(): Promise<Market[]> {
    return this.marketService.findAll();
  }

  @Post()
  save(@Body() body): Promise<Market[]> {
    Logger.log(body);
    return this.marketService.save(body as Market[]);

  }

  @Get('trackAllMarkets')
  trackAllMarkets(): void {
    
  }

}