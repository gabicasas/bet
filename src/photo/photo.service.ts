import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'photo/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {


   constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
      ) {}

      async findAll(): Promise<Photo[]> {
        return await this.photoRepository.find();
      }

      async save(photo: Photo): Promise<Photo[]> {

        const photos: Photo[] = [];
        photos.push(photo);
        return await this.photoRepository.save(photos);
      }
}

