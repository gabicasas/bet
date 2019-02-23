import { Controller, Post, Body, Logger } from '@nestjs/common';
import { BetfairService } from './betfair.service';
import { BetfairMarket } from './model/betfair.market.entity';
import { HOSTS } from './model/HOSTS';
import { RunnerEntity } from './model/runner.entity';
import { BetEntity } from './model/bet.entity';

@Controller('betfair')
export class BetfairController {

    private readonly logger = new Logger(BetfairController.name);

    constructor(private betfair: BetfairService){}

    @Post('/pushNewMarkets')
     pushNewMarkets(@Body() body): any {
        let markets: BetfairMarket[] = [];
        // tslint:disable-next-line:forin
        for ( const i in body){
       /* const market: BetfairMarket = new BetfairMarket();
        market.event=body[i].evento;
        market.market=body[i].mercado;*/
        markets.push({event: body[i].evento, market: body[i].mercado, bet_host: HOSTS.betfairES, finalized: false} as BetfairMarket);
       //  const result =  this.betfair.saveMarket(markets);
        this.betfair.saveMarket(markets).then(a => { });
        markets = [];
        }

        return {ok: true};

    }

    async obtainMarketSync(markets: string[]): Promise<any> {
        return new Promise( (resolve) => {
            this.betfair.obtainMarkets(markets).subscribe(response => {
               resolve(response.data); });

        });

      }

    /**
     *
     * @param marketsBody con un atributo markes que incluye el array de mercados
     */
    @Post('/trackMarkets')
     trackMarkets(@Body() marketsBody): void {
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
                // Se solicitan datos de diez mercados
                // this.logger.log('Mercados a obtener');
                // sthis.logger.log(markets);
                const marketInfo = await this.obtainMarketSync(markets);
                markets = [];
                // this.logger.log(marketInfo);

                // Se desactivan los mercados que ya no existen
                let needSave: boolean = true;
                // tslint:disable-next-line:forin
                for (const index in marketInfo){
                    for (const indej in marketAux){
                        if (marketAux[indej].market === marketInfo[index].marketId){
                            marketAux[indej].finalized = false;
                            needSave = true;
                            await this.saveInfoRunner(marketAux[indej], marketInfo[index]);
                        }
                    }
                }
                if (needSave)
                    this.betfair.saveMarket(marketAux).then(a => { });
                marketAux = [];
            }

        });

    }
    async saveInfoRunner(market: BetfairMarket, marketInfo: any): Promise<any> {

       let r: any;
        // tslint:disable-next-line:forin
       for (const i in marketInfo.runnerDetails){
          const runner: RunnerEntity = new RunnerEntity();
          runner.market = market;
          runner.runnerId = marketInfo.runnerDetails[i].selectionId;
          runner.status = marketInfo.runnerDetails[i].runnerStatus;

          r = await this.betfair.saveRunnersSync(runner);
          const bet: BetEntity = new BetEntity();
          bet.runner = r;
          bet.fee = marketInfo.runnerDetails[i].runnerOdds.trueOdds.decimalOdds.decimalOdds;
          r = await this.betfair.saveOnlyNewBetSync(bet);

       }

    }
}
