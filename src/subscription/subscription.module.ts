import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "src/event/event.entity";
import { SubscriptionEntity } from "./subscription.entity";
import { SubscriptionResolver } from "./subscription.resolver";
import { SubscriptionService } from "./subscription.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriptionEntity, EventEntity]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                },
            }),
        }),
    ],
    providers: [SubscriptionResolver, SubscriptionService],
})
export class SubscriptionModule {}