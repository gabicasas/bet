import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BetfairMarket } from './model/betfair.market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BetfairService {

    private static   marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';
  
    constructor( @InjectRepository(BetfairMarket)
                private readonly repo: Repository<BetfairMarket>,
                 private http: HttpService){

    }

    obtainMarkets(markets): Observable<AxiosResponse<any>>{
        // return this.http.get('https://www.google.es');
        const body: any = {currencyCode: 'EUR', alt: 'json', locale: 'es', marketIds: markets};
        return this.http.post(BetfairService.marketsBetFair, body);
    }

    async saveMarket(markets: BetfairMarket[]): Promise<BetfairMarket[]> {

        
        return await this.repo.save(markets);
      }
}
