import { Module } from '@nestjs/common';
import { Photo } from 'photo/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from 'photo/photo.service';


@Module({
    imports: [
      TypeOrmModule.forFeature([Photo]),
      ],
    controllers: [],
    providers: [PhotoService ],
    
   
  })
export class PhotoModule {}
