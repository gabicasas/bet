import { Injectable, HttpService, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BetfairMarket } from './model/betfair.market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HOSTS } from './model/HOSTS';
import { RunnerEntity } from './model/runner.entity';
import { BetEntity } from './model/bet.entity';

@Injectable()
export class BetfairService {

    private readonly logger = new Logger(BetfairService.name);

    private static marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';

    constructor(@InjectRepository(BetfairMarket) private readonly repoMarket: Repository<BetfairMarket>,
                @InjectRepository(RunnerEntity) private readonly repoRunner: Repository<RunnerEntity>,
                @InjectRepository(BetEntity) private readonly repoBet: Repository<BetEntity>,
                private http: HttpService) {

    }

     obtainMarkets(markets): Observable<AxiosResponse<any>> {
        // return this.http.get('https://www.google.es');
        const body: any = { currencyCode: 'EUR', alt: 'json', locale: 'es', marketIds: markets };
        this.logger.log(body);
        return  this.http.post(BetfairService.marketsBetFair, body);
    }

    async saveMarket(markets: BetfairMarket[]): Promise<BetfairMarket[]> {

        return await this.repoMarket.save(markets);
    }

    async getActiveMarkets(): Promise<BetfairMarket[]> {
        return await this.repoMarket.find({ where: { bet_host: HOSTS.betfairES, finalized: false } });
    }

    async saveRunnersSync(runner: RunnerEntity): Promise<any> {
       /* return new Promise((resolve) => {
            const runners: RunnerEntity[] = [];
            runners.push(runner);
            this.repoRunner.save(runners).then(response => resolve(response));

        });*/
        const runKey: RunnerEntity = await this.repoRunner.findOne(runner.runnerId);
        if (runKey)
            return runKey;
        const runners: RunnerEntity[] = [];
        runners.push(runner);
        
        return await this.repoRunner.save(runners);
    }

    saveOnlyNewBetSync(bet: BetEntity): Promise<any> {
        return new Promise((resolve) => {
            // Se comprueba si existe apuesta con ese corredor y cuota
            this.repoBet.find({ runner: bet.runner, fee: bet.fee }).then(bets => {
                this.logger.log('Hay ' + bets.length + ' elementos');
                if (bets.length === 0) { // Si no hay se inserta
                    bet.timestamp = new Date();
                    this.repoBet.save(bet).then(response => {
                        this.logger.log(response);
                        resolve(response);
                    }, error => {
                        this.logger.error('Fallo al guardar apuesta');
                        this.logger.error(error);
                        this.logger.error(JSON.stringify(bet));
                    }); /* .catch<never>(onrejected => {
                        this.logger.error(onrejected);
                    }); */
                } else
                    resolve({});
            });


        });
    }
}
