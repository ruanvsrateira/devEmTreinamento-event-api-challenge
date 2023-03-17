import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EventEntity } from "./event.entity";
import { EventInput } from "./event.input";
import { EventService } from "./event.service";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from "src/auth/auth.guard";


@Resolver()
export class EventResolver {

    constructor(private readonly eventService: EventService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [EventEntity])
    async findAllEvents(): Promise<EventEntity[]> {

        return await this.eventService.findAll()

    }
    
    @UseGuards(GqlAuthGuard)
    @Mutation(() => EventEntity)
    async createNewEvent(
        @Args("data") data: EventInput
    ): Promise<EventEntity> {

        return await this.eventService.create(data)

    }

}