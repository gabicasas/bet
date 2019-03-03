import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PhotoService {

  
  private static marketsBetFair: string = 'https://smp.betfair.es/www/sports/fixedodds/readonly/v1/getMarketPrices?priceHistory=0';

  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private http: HttpService) {}

 

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async save(photos: Photo[]): Promise<Photo[]> {
    return await this.photoRepository.save(photos);
  }
}
