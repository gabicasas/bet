import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from 'photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { PhotoService } from 'photo/photo.service';





@Module({
  imports: [
    //TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forRoot(),

    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
    PhotoModule],
  controllers: [AppController],
  providers: [ AppService, PhotoService ],
  
 
})
export class AppModule {}
