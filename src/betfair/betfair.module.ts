import { Module, HttpModule } from '@nestjs/common';
import { BetfairService } from './betfair.service';
//import { ServiceController } from './src/service/service.controller';
import { BetfairController } from './betfair.controller';
import { BetfairMarket } from './model/betfair.market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forFeature([BetfairMarket]),
        HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
    })],
    providers: [BetfairService],
    controllers: [BetfairController],
})
export class BetfairModule { }
