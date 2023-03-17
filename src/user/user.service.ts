import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserInput } from './user.input';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({})
    }

    async findById(id: UserEntity["id"]) {
        
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException('user not founded by this id');

        return user;

    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user =  await this.userRepository.findOne({ where: { email } })
    
        if(!user)
            throw new NotFoundException("user not founded by this email")

        return user;
    }

    async create(data: CreateUserInput): Promise<UserEntity> {
        const userExists = await this.userRepository.exist({ where: { email: data.email } })

        if(userExists) 
            throw new BadRequestException("This already used by other user")

        return await this.userRepository.save({
            name: data.name,
            email: data.email,
            password: data.password,
        });
    }
}