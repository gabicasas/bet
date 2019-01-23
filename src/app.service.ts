import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {

  private static   marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';
  root(): string {
    return 'Hello NESTjs!';

  }

  constructor(private http: HttpService){

  }

  getGoogle(): Observable<AxiosResponse<any>>{
      // return this.http.get('https://www.google.es');
      const body: any ={'currencyCode':'EUR','alt':'json','locale':'es','marketIds':['924.170379398','924.170672539']};
      return this.http.post(AppService.marketsBetFair,body);
            }
}
