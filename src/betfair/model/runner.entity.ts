import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { BetfairMarket } from './betfair.market.entity';

@Entity()
export class RunnerEntity {
   
    @ManyToOne(type => BetfairMarket,  {cascade: true, nullable: false, onDelete: 'CASCADE'})
    market: BetfairMarket;

    @PrimaryColumn()
    runnerId: string; // selectionID en el json

    @Column()
    status: string;

}
