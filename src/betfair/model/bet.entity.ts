import { Entity, PrimaryColumn, Column, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { RunnerEntity } from './runner.entity';

@Entity()
@Unique(['runner', 'fee'])
export class BetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => RunnerEntity,  {cascade: true, nullable: false, onDelete: 'CASCADE'})
    runner: RunnerEntity;

    @Column({nullable: false, type: 'float'})
    fee: number; //cuota

    @Column({nullable: false})
   timestamp: Date;


}