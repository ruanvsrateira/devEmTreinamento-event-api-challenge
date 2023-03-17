import { Field, ID, InputType } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@InputType()
export class CreateSubscriptionInput {

    @IsInt()
    @Field(() => String)
    eventId: string;

    @IsInt()
    @Field(() => ID)
    userId: string;
    

}