import { Entity, PrimaryColumn, Column, ManyToOne, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BetfairMarket } from './betfair.market.entity';

@Entity()
@Index(['market', 'runnerId'], { unique: true })
export class RunnerEntity {

    @PrimaryGeneratedColumn()
    id: number;
   // @PrimaryColumn()
    @ManyToOne(type => BetfairMarket,  {cascade: true, nullable: false, onDelete: 'CASCADE'})
    market: BetfairMarket;

    @Column()
    runnerId: string; // selectionID en el json

    @Column()
    status: string;

}
