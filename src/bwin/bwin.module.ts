import { Module, HttpModule } from '@nestjs/common';
import { BwinService } from './bwin.service';
import { BwinController } from './bwin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../mongo/photo/photo.entity';
import { Market } from '../mongo/photo/market.mongo.entity';
import { MarketHistory } from '../mongo/photo/market.history.mongo.entity';
import { MarketTest } from '../mongo/photo/market.test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, Market, MarketHistory, MarketTest], 'mongoConnection'),
   // TypeOrmModule.forFeature([BetfairMarket]),
    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
    providers: [BwinService],
    controllers: [BwinController],
})
export class BwinModule {}
