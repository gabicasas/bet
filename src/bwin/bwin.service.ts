import { Injectable, HttpService, Logger } from '@nestjs/common';
//import JSONPath from 'jsonpath-plus';
const {JSONPath} = require('jsonpath-plus');

@Injectable()
export class BwinService {

    private readonly logger: Logger = new Logger(BwinService.name);

    private static readonly urlAccessId: string = 'https://sports.bwin.es/es/client-bootstrap-scripts.js';

    // tslint:disable-next-line:max-line-length
    private static readonly urlData: string = 'https://bcdapi.itsfogo.com/v1/BettingOffer/Grid/liveBestsellerEvents?countryCode=ES&lang=es';
    private static accessId: string | undefined = undefined;

    constructor(private http: HttpService) { }

    get  clientAccessId(): string | undefined {
        return BwinService.accessId;
    }

   
    /**
     * Obtiene e clientAccesId de la web yo almacena en variable estaca para tenerlo
     * disponble para sguientes llamdas.
     */
     private async initializeClientAccessId(): Promise<string> {
        return new Promise<string>((resolve) => {
            if (BwinService.accessId !== undefined) {
                  resolve(BwinService.accessId);
            } else {
                this.http.get(BwinService.urlAccessId).subscribe(response => {
                    const scr: string = response.data as string;
                    const window: any = {};
                    // tslint:disable-next-line:no-eval
                    eval(scr);
                    // tslint:disable-next-line:no-debugger

                    const clientAccessId: string = window.bwin.sports.configuration.LivewidgetClientConfiguration.accessId;
                    this.logger.log('clientId: ' + clientAccessId);
                    BwinService.accessId = clientAccessId;
                    resolve(BwinService.accessId);
                });
            }
         });
     }

    /**
     * Obtiene la info sin formatear
     */
    async getInfoBwin(): Promise<any> {
        return new Promise(async (resolve) => {
            const cId: string = await this.initializeClientAccessId();
            // const cId: string = 'aaa';
            const url: string = BwinService.urlData + '&x-bwin-accessId=' + cId;
            this.logger.log(url);
            this.http.get(url).subscribe(
                response => {
                    this.logger.log('Datos obtenidos de bwin');

                    // const groupIds = JSONPath(response.data , '$..groupId');
                    resolve(response.data);
                },
            );
        });
    }

    /**
     * Transforma el dato tal cual lo devuelve getInfoBWin (Es el T del etl)
     * @param data dato  tal cual lo devuelve getInfoBWin
     */
    transformData(data: any):any {
       
        const marketName={}; //Almacena los nombres descriptivos de los mercados	
        //todos los ids de grupo	
        let groupIds=JSONPath({json:data,path:'$..groupId'});
        for(let i in groupIds){
            if(typeof groupIds[i] === 'string'){
                let nameGroup = JSONPath({json:data,path:'$..'+groupIds[i]});
                // console.log(nameGroup[0].id+' '+nameGroup[0].name );
                marketName[nameGroup[0].id]={};
                marketName[nameGroup[0].id].name=nameGroup[0].name;
                marketName[nameGroup[0].id].optionNames=data.response.groups[nameGroup[0].id].optionNames;
                
            }
                
        }
        let marketsStruct=JSONPath({json:data,path:'$.response.events.*.markets'});
        let market=[];
        for(let i in marketsStruct){
            for(var j in marketsStruct[i]){
                marketsStruct[i][j].name=marketName[marketsStruct[i][j].groupId].name;
                let index=0;
                //Revisar esto que no pasa del primero
                for(let k in marketsStruct[i][j].options){
                    marketsStruct[i][j].options[k].name=marketName[marketsStruct[i][j].groupId].optionNames[index];
                }
                market.push(marketsStruct[i][j]);
                
                }
            }
          
            return market;
    }


}
