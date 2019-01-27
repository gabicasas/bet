import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BwinModule } from './bwin/bwin.module';





@Module({
  imports: [
    //TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forRoot(),

    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
    
    BwinModule],
  controllers: [AppController],
  providers: [ AppService],
  
 
})
export class AppModule {}
