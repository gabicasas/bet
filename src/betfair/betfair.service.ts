import { Injectable, HttpService, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BetfairMarket } from './model/betfair.market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HOSTS } from './model/HOSTS';

@Injectable()
export class BetfairService {

    private readonly logger = new Logger(BetfairService.name);

    private static   marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';
  
    constructor( @InjectRepository(BetfairMarket)
                private readonly repo: Repository<BetfairMarket>,
                 private http: HttpService){

    }

    obtainMarkets(markets): Observable<AxiosResponse<any>>{
        // return this.http.get('https://www.google.es');
        const body: any = {currencyCode: 'EUR', alt: 'json', locale: 'es', marketIds: markets};
        this.logger.log(body);
        return this.http.post(BetfairService.marketsBetFair, body);
    }

    async saveMarket(markets: BetfairMarket[]): Promise<BetfairMarket[]> {

        return await this.repo.save(markets);
      }

   async getActiveMarkets(): Promise<BetfairMarket[]> {
       return await this.repo.find({ where: { bet_host: HOSTS.betfairES } });
   }
}
