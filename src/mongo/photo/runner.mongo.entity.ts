import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

//@Entity()
export class Runner {
  //@ObjectIdColumn() id: ObjectID;

  // @Column()
   ids: string[] = [];

 // @Column()
  fee: any = {};
}