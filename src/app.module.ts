import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EventEntity } from './event/event.entity';
import { EventModule } from './event/event.module';
import { SubscriptionEntity } from './subscription/subscription.entity';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example'
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_DIALECT as "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, EventEntity, SubscriptionEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule, AuthModule, EventModule, SubscriptionModule
  ],
})
export class AppModule {}
