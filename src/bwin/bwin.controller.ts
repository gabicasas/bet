import { Controller, Get } from '@nestjs/common';
import { BwinService } from './bwin.service';
import { getDiffieHellman } from 'crypto';

@Controller('bwin')
export class BwinController {

constructor(private bwin: BwinService){}

@Get('/id')
getId(): string {
    this.bwin.initializeClientAccessId();
    return 'id almacenado';
}


}


