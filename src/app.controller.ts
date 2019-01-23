import { Get, Controller, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as http from 'http';
import { Http2ServerRequest } from 'http2';

@Controller()
export class AppController {

  private result: string = '';
  constructor(private readonly appService: AppService) {}

  //Tiene que venir con Content-type application-json para que el body lo lea como objeto
 @Post('/post')
  post(@Body() body): string{
    return 'aa';
  }

  @Get('/as')
  root(@Query() query): string {

    
    const a = this.appService.getGoogle();
    a.subscribe(response =>
      {
       this.result = JSON.stringify(response.data);
      });
    return this.appService.root() + this.result;
  
  }
}
