import { Controller, Get } from '@nestjs/common';
import { BwinService } from './bwin.service';
import { Any } from 'typeorm';

@Controller('bwin')
export class BwinController {

constructor(private bwin: BwinService){}

/*
@Get('/id')
getId(): string {
    this.bwin.initializeClientAccessId();
    return 'id almacenado';
}*/

@Get('/trackAllMarkets')
async trackAllMarkets(): Promise<any> {
    const data: any = await this.bwin.getInfoBwin();
    return this.bwin.transformData(data);
}

}