import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: "ruan",
                signOptions: {
                    expiresIn: "30s"
                }
            })
        })
    ],
    providers: [AuthService, AuthResolver, UserService, JwtStrategy]
})
export class AuthModule {}