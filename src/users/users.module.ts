import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UsersService, UserResolver],
  exports: [UsersService]
})
export class UsersModule {}
