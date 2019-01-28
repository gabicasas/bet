import { Injectable, HttpService, Logger } from '@nestjs/common';

@Injectable()
export class BwinService {

    private readonly logger: Logger = new Logger(BwinService.name);

    private static readonly urlAccessId: string = 'https://sports.bwin.es/es/client-bootstrap-scripts.js';

    // tslint:disable-next-line:max-line-length
    private static readonly urlData: string = 'https://bcdapi.itsfogo.com/v1/BettingOffer/Grid/liveBestsellerEvents?countryCode=ES&lang=es';
    private static accessId: string;


    constructor(private http: HttpService){}

    get clientAccessId(): string{
        return BwinService.accessId;
    }


    initializeClientAccessId(): void{
        this.http.get(BwinService.urlAccessId).subscribe( response => {
            const scr: string = response.data;
            const window: any = {};
            eval(scr);
            // tslint:disable-next-line:no-debugger

            const clientAccessId: string = window.bwin.sports.configuration.LivewidgetClientConfiguration.accessId;
            this.logger.log('clientId: ' + clientAccessId);
            BwinService.accessId = clientAccessId;
            this.getInfoBwin();
            });
    }


    getInfoBwin(){
        const url: string = BwinService.urlData + '&x-bwin-accessId=' + this.clientAccessId;
        this.logger.log(url);
        this.http.get(url).subscribe(
            response =>
             this.logger.log(JSON.stringify(response.data)),
        );
    }
}
