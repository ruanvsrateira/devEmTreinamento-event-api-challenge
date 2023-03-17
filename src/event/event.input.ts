import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsInt, IsString } from "class-validator";

@InputType()
export class EventInput {

    @IsString()
    @Field(() => String)
    name: string;

    @IsString()
    @Field({ nullable: true })
    aditionalInformation: string

    @IsDate()
    @Field()
    startDate: Date

    @IsDate()
    @Field()
    startDateRegistration: Date

    @IsDate()
    @Field()
    endDateRegistration: Date

    @IsString()
    @Field()
    link: string;

    @IsInt()
    @Field({ nullable: true })
    participantsLimit: number;

}