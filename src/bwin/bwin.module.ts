import { Module, HttpModule } from '@nestjs/common';
import { BwinService } from './bwin.service';
import { BwinController } from './bwin.controller';
import { BetfairMarket } from 'betfair/model/betfair.market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BetfairMarket]),
    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
    providers: [BwinService],
    controllers: [BwinController],
})
export class BwinModule {}
