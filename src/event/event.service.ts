import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventInput } from './event.input';

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>
    ) {}

    async findAll(): Promise<EventEntity[]> {

        return await this.eventRepository.find({})

    }

    async create(data: EventInput): Promise<EventEntity> {

        return await this.eventRepository.save(data)

    }

}