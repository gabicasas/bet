import { Entity, PrimaryColumn, Column, ManyToOne, Unique, PrimaryGeneratedColumn, Index } from 'typeorm';
// tslint:disable-next-line:max-line-length
import { SimpleColumnType, SpatialColumnType, WithLengthColumnType, WithPrecisionColumnType, WithWidthColumnType } from 'typeorm/driver/types/ColumnTypes';
import { RunnerEntity } from './runner.entity';

@Entity()
//@Index(['runner', 'fee'], { unique: true })
//s@Unique(['runner', 'fee'])
export class BetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => RunnerEntity,  { nullable: false, onDelete: 'CASCADE'})
    runner: RunnerEntity;

    @Column({nullable: false, type: 'double'  })
    fee: number; //cuota

    @Column({nullable: false})
   timestamp: Date;


}