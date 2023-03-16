import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './auth.input';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(data: AuthInput): Promise<AuthType> {

        const user = await this.userService.findByEmail(data.email)

        const validPassword = compareSync(data.password, user.password)

        if(!validPassword)
            throw new UnauthorizedException("Invalid password")

        const token = await this.JWT(user)
 
        return {
            user, token
        }

    }

    private JWT(user: UserEntity): Promise<string> {

        return this.jwtService.signAsync( { username: user.name, sub: user.id })
    
    }

}