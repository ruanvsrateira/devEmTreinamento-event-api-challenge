import { UseGuards, Inject } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { SubscriptionEntity } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Resolver()
export class SubscriptionResolver {

    constructor(
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        private readonly subscriptionService: SubscriptionService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [SubscriptionEntity])
    async findSubscriptionsOfUser(@Context() context) {
        const bearerToken = context.req.headers.authorization;
        const payload = this.jwtService.decode(bearerToken.split(' ')[1]);

        console.log(payload.sub)

        return await this.subscriptionService.findByIdUser(payload.sub as string);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SubscriptionEntity)
    async registerInEvent(@Context() context, @Args('eventId') eventId: string) {
        const bearerToken = context.req.headers.authorization;
        const payload = await this.jwtService.decode(bearerToken.split(' ')[1]);

        return await this.subscriptionService.create({
            userId: payload.sub,
            eventId,
        })
    }

}