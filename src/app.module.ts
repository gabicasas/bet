import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BwinModule } from './bwin/bwin.module';
import { BetfairModule } from './betfair/betfair.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'mongo/cats/cats.module';
import { PhotoModule } from 'mongo/photo/photo.module';
import { Photo } from 'mongo/photo/photo.entity';

const mongoOptions = {
  type: 'mongodb',
  host: 'localhost',
  database: 'test',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};



@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://gabicasas:gabicasas1@ds249025.mlab.com:49025/heroku_6s2hw3fv'),
    //TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'test',
      entities: ['src/mongo/**/**.entity{.ts,.js}'],
      synchronize: true,
      name: 'mongoConnection',
    }),
    PhotoModule,
    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
    BwinModule,
    BetfairModule,
    CatsModule],
  controllers: [AppController],
  providers: [ AppService],

})
export class AppModule {}
