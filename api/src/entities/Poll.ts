import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';
import { ObjectType, Field, InputType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class iPhonePoll {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(type => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  BAN: string;

  @Column()
  @Field()
  model: string;

  @Column({ type: 'int' })
  @Field(type => Int)
  quantity: number;

  @Column({ name: 'started_process' })
  @Field()
  startedProcess: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;
}

@InputType()
export class iPhonePollInput {
  @Field()
  BAN: string;

  @Field()
  model: string;

  @Field()
  quantity: number;

  @Field()
  startedProcess: boolean;
}

@InputType()
export class iPhonePollFilter {
  @Field({ nullable: true })
  model: string;

  @Field({ nullable: true })
  startedProcess: boolean;
}
