import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './market.mongo.entity';
import { MarketTest } from './market.test.entity';

@Injectable()
export class MarketService {

  private static marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';


  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
    @InjectRepository(MarketTest)
    private readonly marketTestRepository: Repository<MarketTest>,
    private http: HttpService) {}

  async obtainMarketsFromBetfair(markets): Promise<any> {
    return new Promise( (resolve) => {
    const body: any = { currencyCode: 'EUR', alt: 'json', locale: 'es', marketIds: markets };
    // this.logger.log(body);
    this.http.post(MarketService.marketsBetFair, body).subscribe(response => {
      resolve(response.data);
    }); });
}

  async findAll(): Promise<Market[]> {
    return await this.marketRepository.find();
  }

  async findMarket(idMarket: string): Promise<Market[]> {
    // const repo = this. marketRepository.manager.connection.getMongoRepository(Market);
    const repo = this. marketRepository;
    
    return await repo.find(
      {
          where: { ids : {
              $in: [idMarket],
          }},
      },
);
  }

  public async save(markets: Market[]): Promise<Market[]> {
    return await this.marketRepository.save(markets);
  }

  /*
Mercado con un solo corredor que se almacena en MarketTest con multiples ids de mercado
y crredor para ir guardando loas apuestas similares de distintas casas.

  */
  public async setRunnerInMarket(marketT: MarketTest): Promise<any> {

      const mts: MarketTest[] = await this.marketTestRepository.find();
      if (mts.length === 0){
        mts.push(marketT);
        return this.marketTestRepository.save(mts);
      }else {
        const mkt: MarketTest = mts[0];
        if (mkt.ids.indexOf(marketT.ids[0]) === -1){ // Es un mercado nuevo,luego se añade
          mkt.ids.push(marketT.ids[0]);
        }
        if (mkt.runners[0].ids.indexOf(marketT.runners[0].ids[0]) === -1){ // Es un id de runner nuevo,luego se añade
          mkt.runners[0].ids.push(marketT.runners[0].ids[0]);
        }

        return  this.marketTestRepository.save(mts);
      }

  }
}