import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
