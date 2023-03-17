import { Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm'

import { ObjectType, Field, HideField, ID } from '@nestjs/graphql'
import { hashSync } from 'bcrypt';
import { hashPasswordTransform } from 'src/utils/hashPasswordTransform';

@ObjectType()
@Entity()
export class UserEntity {

    @Field(() => String)
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @HideField()
    @Column({
        transformer: hashPasswordTransform
    })
    password: string

    @Field()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @Field()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}