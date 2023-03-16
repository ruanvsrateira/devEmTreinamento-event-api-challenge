import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
    
    @Field()
    @IsString()
    name: string

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    password: string;

}