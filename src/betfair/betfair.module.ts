import { Module, HttpModule } from '@nestjs/common';
import { BetfairService } from './betfair.service';
import { BetfairController } from './betfair.controller';
import { BetfairMarket } from './model/betfair.market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunnerEntity } from './model/runner.entity';
import { BetEntity } from './model/bet.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BetfairMarket, RunnerEntity, BetEntity]),
        HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
    })],
    providers: [BetfairService],
    controllers: [BetfairController],
})
export class BetfairModule { }
