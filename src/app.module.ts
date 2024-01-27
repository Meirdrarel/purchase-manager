import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'
import {SequelizeModule} from "@nestjs/sequelize";
import {PurchaseModule} from "./purchase_orders/porder.module";

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
    PurchaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    })
  ]
})
export class AppModule {}