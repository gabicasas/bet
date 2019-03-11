import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { Market } from './market.mongo.entity';
import { BetfairModule } from '../../betfair/betfair.module';
import { BetfairService } from '../../betfair/betfair.service';
import { MarketHistory } from './market.history.mongo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Market, MarketHistory], 'mongoConnection'),
  BetfairModule],
  providers: [PhotoService, MarketService, BetfairService],
  controllers: [PhotoController, MarketController],
})
export class PhotoModule {}
