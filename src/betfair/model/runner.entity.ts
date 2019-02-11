import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { BetfairMarket } from './betfair.market.entity';

@Entity()
export class RunnerEntity {
    @ManyToOne(type => BetfairMarket)
    market: BetfairMarket;

    @PrimaryColumn()
    runnerId: string; // selectionID en el json

    status: string;

}
