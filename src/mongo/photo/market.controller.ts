import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from './market.mongo.entity';
import { BetfairService } from '../../betfair/betfair.service';
import { BetfairMarket } from '../../betfair/model/betfair.market.entity';
import { Runner } from './runner.mongo.entity';
import { runInContext } from 'vm';
import { MarketTest } from './market.test.entity';



@Controller('market')
export class MarketController {

  private readonly logger = new Logger(MarketController.name);


  constructor(private readonly marketService: MarketService, private betfair: BetfairService) { }

  @Get()
  findAll(): Promise<Market[]> {
    return this.marketService.findAll();
  }

  @Post()
  save(@Body() body): Promise<Market[]> {
    this.logger.log(body);
    return this.marketService.save(body as Market[]);

  }

  @Get('/trackAllMarkets')
  trackAllMarkets(): string {
    this.betfair.getActiveMarkets().then(async (arrayMarket: BetfairMarket[]) => {
      let markets: string[] = [];
      let marketAux: BetfairMarket[] = [];

      // tslint:disable-next-line:prefer-for-of
      for (let i: number = 0; i < arrayMarket.length; i = i + 10) {
        for (let j: number = 0; j < 10; j++) {
          if ((i + j) < arrayMarket.length) {
            markets[j] = arrayMarket[i + j].market;
            // se marcan comofinalizados provisinalmente
            arrayMarket[i + j].finalized = true;
            marketAux.push(arrayMarket[i + j]);
          }
        }

        /*  markets = [];
          marketAux = [];
        } */




        // Se solicitan datos de diez mercados
        const marketInfo: any[] = await this.marketService.obtainMarketsFromBetfair(markets);

        // tslint:disable-next-line:prefer-for-of
        for (let i: number = 0; i < marketInfo.length; i++) {

          this.logger.log('Mercado ' + marketInfo[i].marketId);
          let mrkt: Market;

          const mrkts: Market[] = await this.marketService.findMarket(marketInfo[i].marketId);
          if (mrkts.length === 1)
            mrkt = mrkts[0];
          else {
            mrkt = new Market();
            mrkt.ids.push(marketInfo[i].marketId + '_betfairES');
          }

          // Se buscan en runners si existe el runners adecuado para actualizarlo

          let existThisRunner: boolean = false;

          // tslint:disable-next-line:prefer-for-of
          for (let rd = 0; rd < marketInfo[i].runnerDetails.length; rd++) {
            existThisRunner = false;
            let runner: Runner;
            // tslint:disable-next-line:prefer-for-of
            for (let ri = 0; ri < mrkt.runners.length; ri++) {
              runner = mrkt.runners[ri];
              if (runner.ids.indexOf(marketInfo[i].runnerDetails[rd].selectionId + '_betfairES') !== -1) {
                existThisRunner = true;
                break;
              }
            }
            if (!existThisRunner) {
              runner = new Runner();
              runner.ids.push(marketInfo[i].runnerDetails[rd].selectionId + '_betfairES');
              mrkt.runners.push(runner);
            }

            runner.fee.betfairES = marketInfo[i].runnerDetails[rd].runnerOdds.decimalDisplayOdds.decimalOdds;


            let mercados: Market[] = [];
            mercados.push(mrkt);
            mercados = await this.marketService.save(mercados);
          }
        }


        markets = [];
        marketAux = [];
      }
    });
    return 'aaaa';
  }

  @Post('/newRunner')
  async newRunner(@Body() body): Promise<any>{
    return this.marketService.setRunnerInMarket( body as MarketTest);
  }
}