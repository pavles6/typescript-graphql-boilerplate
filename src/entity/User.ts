import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string

  @Column('text')
  password: string

  @Column('bool', { default: false })
  confirmed: boolean

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }
}
