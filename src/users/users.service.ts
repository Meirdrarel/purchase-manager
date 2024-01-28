import { Injectable } from '@nestjs/common';
import {UserModel} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';
import {randomUUID} from "crypto";
import {User} from "./user.interface";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel
    ) {
    }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne<UserModel>({
            where: {
                email: email
            },
            raw: true
        });
    }

    async addUser(email: string, userPassword: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
        const user = await this.userModel.create({
            id: randomUUID(),
            email: email,
            password: hashedPassword
        })

        return {
            id: user.id,
            email: user.email
        }
    }
}
