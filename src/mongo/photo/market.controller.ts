import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from './market.mongo.entity';
import { BetfairService } from 'betfair/betfair.service';
import { BetfairMarket } from 'betfair/model/betfair.market.entity';


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
    this.betfair.getActiveMarkets().then(async (arrayMarket: BetfairMarket[]) => {
      let markets: string[] = [];
      let marketAux: BetfairMarket[] = [];

      // tslint:disable-next-line:prefer-for-of
      for ( let i: number = 0; i < arrayMarket.length; i = i + 10){
          for (let j: number = 0 ; j < 10; j++){
              if ((i + j) < arrayMarket.length){
                  markets[j] = arrayMarket[i + j].market;
                  // se marcan comofinalizados provisinalmente
                  arrayMarket[i + j].finalized = true;
                  marketAux.push(arrayMarket[i + j]);
              }
          }
        }

          // Se solicitan datos de diez mercados
      const marketInfo = await this.marketService.obtainMarketsFromBetfair(markets);
      markets = [];
      marketAux = [];
      
  }

}