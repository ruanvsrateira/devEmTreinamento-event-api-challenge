import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthInput } from './auth.input';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(returns => AuthType)
    async login(
        @Args("data") data: AuthInput
    ): Promise<AuthType> {

        const response = await this.authService.validateUser(data)

        return {
            user: response.user,
            token: response.token,
        }

    }
    
}