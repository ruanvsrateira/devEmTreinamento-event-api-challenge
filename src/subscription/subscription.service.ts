import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "src/event/event.entity";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";
import { CreateSubscriptionInput } from "./subscription.input";

@Injectable()
export class SubscriptionService {

    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,

        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>
    ) {}

    async findByIdUser(userId: string): Promise<SubscriptionEntity[]> {

        return await this.subscriptionRepository.find({where:{userId: userId}})

    }

    async findById(eventId: string): Promise<SubscriptionEntity> {

        const subscription = await this.subscriptionRepository.findOneBy({ eventId })

        if(!subscription) 
            throw new NotFoundException('event not founded by this id')

        return subscription

    }

    async create(data: CreateSubscriptionInput): Promise<SubscriptionEntity> {

        const eventExists = await this.eventRepository.findOneBy({ id: data.eventId })

        if(!eventExists)
            throw new NotFoundException('Not founded event by this id')

        if(eventExists.startDateRegistration <= new Date() && eventExists.endDateRegistration >= new Date()) {

            return await this.subscriptionRepository.save(data)

        } else {

            throw new BadRequestException('Invalid Date registration')

        }

    }

}