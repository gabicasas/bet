import { Controller, Post, Body, Logger } from '@nestjs/common';
import { BetfairService } from './betfair.service';
import { BetfairMarket } from './model/betfair.market.entity';
import { HOSTS } from './model/HOSTS';

@Controller('betfair')
export class BetfairController {

    private readonly logger = new Logger(BetfairController.name);

    constructor(private betfair: BetfairService){}

    @Post('/pushNewMarkets')
    pushNewMarkets(@Body() body): void {
        let markets: BetfairMarket[] = [];
        // tslint:disable-next-line:forin
        for(let i in body){
       /* const market: BetfairMarket = new BetfairMarket();
        market.event=body[i].evento;
        market.market=body[i].mercado;*/
        markets.push({event:body[i].evento, market:body[i].mercado, bet_host: HOSTS.betfairES} as BetfairMarket);
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
        this.betfair.getActiveMarkets().then((arrayMarket: BetfairMarket[]) => { 
            const markets: string[] = [];
            arrayMarket.forEach(element => {
                markets.push(element.market);
            });
            this.logger.log('Mercados a obtener');
            this.logger.log(markets);
            this.betfair.obtainMarkets(markets).subscribe(response =>
                this.logger.log(response.data));
        });
        
    }
}
