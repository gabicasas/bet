import { Controller, Post, Body, Logger } from '@nestjs/common';
import { BetfairService } from './betfair.service';
import { BetfairMarket } from './model/betfair.market.entity';

@Controller('betfair')
export class BetfairController {

    private readonly logger = new Logger(BetfairController.name);

    constructor(private betfair: BetfairService){}

    @Post('/pushNewMarkets')
    pushNewMarkets(@Body() body): void {
        let markets: BetfairMarket[] = [];
        for(let i in body){
       /* const market: BetfairMarket = new BetfairMarket();
        market.event=body[i].evento;
        market.market=body[i].mercado;*/
        markets.push({event:body[i].evento,market:body[i].mercado} as BetfairMarket);
        this.betfair.saveMarket(markets).then(a => { });
            markets=[];
        }
       

        

    }
    /**
     * 
     * @param marketsBody con un atributo markes que incluye el array de mercados
     */
    @Post('/trackMarkets')
    trackMarkets(@Body() marketsBody): void {
      this.betfair.obtainMarkets(marketsBody.markets).subscribe(response =>
        this.logger.log(response.data));
    }
}
