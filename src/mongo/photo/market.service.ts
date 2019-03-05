import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './market.mongo.entity';

@Injectable()
export class MarketService {

  private static marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';


  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
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

  async save(markets: Market[]): Promise<Market[]> {
    return await this.marketRepository.save(markets);
  }
}