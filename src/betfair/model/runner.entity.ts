import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BetfairMarket } from './betfair.market.entity';

@Entity()
export class RunnerEntity {
    @PrimaryColumn()
    market: BetfairMarket;

    @PrimaryColumn()
    runnerId: string; // selectionID en el json

    status: string;

}
