import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'
import {SequelizeModule} from "@nestjs/sequelize";
import {SalesModule} from "./sales/sales.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {AuthController} from "./auth/auth.controller";

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
    SalesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    })
  ],
  controllers: [
      AuthController
  ]
})
export class AppModule {}