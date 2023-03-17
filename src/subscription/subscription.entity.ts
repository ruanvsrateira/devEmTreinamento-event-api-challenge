import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class SubscriptionEntity{
    
    @PrimaryGeneratedColumn('uuid', { name: 'subscription_id' })
    @Field()
    subscriptionId: string;

    @Field()
    @Column()
    userId: string;

    @Field()
    @Column()
    eventId: string;
;

    @Field()
    @Column({ default: new Date(), name: "subscription_date" })
    subscriptionDate: Date;
    
}