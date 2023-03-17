import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class EventEntity {

    @Field(() => String)
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ name: "aditional_information", nullable: true })
    aditionalInformation: string

    @Field()
    @Column({ name: "start_date" })
    startDate: Date

    @Field()
    @Column({ name: "start_date_registration" })
    startDateRegistration: Date

    @Field()
    @Column({ name: "end_date_registration" })
    endDateRegistration: Date

    @Field()
    @Column()
    link: string;

    @Field({ nullable: true })
    @Column({ name: "participants_limit", nullable: true })
    participantsLimit: number;

    @Field()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}