import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { Market } from './market.mongo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Market], 'mongoConnection')],
  providers: [PhotoService, MarketService],
  controllers: [PhotoController, MarketController],
})
export class PhotoModule {}
