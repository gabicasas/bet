import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Market {
  @ObjectIdColumn() id: ObjectID;

  @Column() ids: string[];


}