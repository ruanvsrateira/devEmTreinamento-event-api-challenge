import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserEntity])
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userService.findAll()
    }

    @Mutation(() => UserEntity)
    async createNewUser(
        @Args("data") data: CreateUserInput
    ): Promise<UserEntity> {
        return await this.userService.create(data)
    }

}