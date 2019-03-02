import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {

  private readonly logger = new Logger(PhotoController.name);


  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post()
  save(@Body() body): Promise<Photo[]> {
    Logger.log(body);
    return this.photoService.save(body as Photo[]);

  }
}
