import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class BetfairMarket {
  @PrimaryColumn()
  event: string;

  @PrimaryColumn()
  market: string;

  @Column()
  inplay: boolean;
}