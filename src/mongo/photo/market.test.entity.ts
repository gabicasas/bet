import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Runner } from './runner.mongo.entity';
import { Market } from './market.mongo.entity';

@Entity({name: 'market_test'})
export class MarketTest extends Market { }