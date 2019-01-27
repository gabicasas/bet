import { Injectable, HttpService, Logger } from '@nestjs/common';

@Injectable()
export class BwinService {

    private readonly logger: Logger = new Logger(BwinService.name);

    private static readonly urlAccessId: string = 'https://sports.bwin.es/es/client-bootstrap-scripts.js';


    private static accessId: string;


    constructor(private http: HttpService){}

    get clientAccessId(): string{
        return BwinService.urlAccessId;
    }


    initializeClientAccessId(){
        return this.http.get(BwinService.urlAccessId).subscribe( response => {
            const scr: string = response.data;
            const window: any = {};
            eval(scr);
            // tslint:disable-next-line:no-debugger

            const clientAccessId: string = window.bwin.sports.configuration.LivewidgetClientConfiguration.accessId;
            Logger.log('clientId: ' + clientAccessId);
            BwinService.accessId = clientAccessId;
            });
    }
}
