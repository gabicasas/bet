import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
//@Unique(['bet_host', 'market', 'event'])
export class BetfairMarket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bet_host: string;

  @Column()
  event: string;

  @Column()
  market: string;

  @Column()
  inplay: boolean;

  @Column()
  finalized: boolean;
}