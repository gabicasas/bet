import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Runner } from './runner.mongo.entity';

@Entity({name: 'mercado'})
export class Market {
  @ObjectIdColumn() id: ObjectID;

  @Column() ids: string[] = [];

 @Column() runners: Runner[] = [];
} 