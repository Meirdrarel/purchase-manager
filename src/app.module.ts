import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'
import {SequelizeModule} from "@nestjs/sequelize";
import {PurchaseModule} from "./purchase_orders/purchase-order.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {AppController} from "./app.controller";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'app',
      password: 'app',
      schema: 'public',
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    PurchaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    })
  ],
  controllers: [
      AppController
  ]
})
export class AppModule {}