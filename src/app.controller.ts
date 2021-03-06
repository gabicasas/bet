import { Get, Controller, Query, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private result: string = '';
  constructor(private readonly appService: AppService ) {}

  // Tiene que venir con Content-type application-json para que el body lo lea como objeto
 @Post('/post')
  post(@Body() body): string{
    return 'aa';
  }
/**
  @Get('/foto')
  photo(@Query() query): Photo[] {
    const photo: Photo = new Photo();
    photo.name = query.name;
    photo.description = query.description;
    photo.views = 0;

    
    let result: Photo[];
    this.photoService.save(photo).then((fotos) => {
        result = fotos;
      });

    
    return result;


  }*/

  @Get('/as')
  rootAs(@Query() query): string {

    
    const a = this.appService.getGoogle();
    a.subscribe(response =>
      {
       this.result = JSON.stringify(response.data);
      });
    return this.appService.root() + this.result;
  
  }

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
