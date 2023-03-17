import { ObjectType, Field } from '@nestjs/graphql'
import { UserEntity } from 'src/user/user.entity'

@ObjectType()
export class AuthType {
    
    @Field(() => UserEntity)
    user: UserEntity

    @Field()
    token: string

}

export class ContextType {

    req: {
        headers: {
            authorization: string
        }
    }

}