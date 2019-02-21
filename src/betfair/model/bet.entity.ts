import { Entity, PrimaryColumn, Column, ManyToOne, Unique, PrimaryGeneratedColumn, Index } from 'typeorm';

import { RunnerEntity } from './runner.entity';

@Entity()
@Index(['runner', 'fee'], { unique: true })
//s@Unique(['runner', 'fee'])
export class BetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => RunnerEntity,  { nullable: false, onDelete: 'CASCADE'})
    runner: RunnerEntity;

    @Column({nullable: false, type: 'float'})
    fee: number; //cuota

    @Column({nullable: false})
   timestamp: Date;


}