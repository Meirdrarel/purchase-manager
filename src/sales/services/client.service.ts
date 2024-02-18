import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ClientModel} from "../models/client.model";
import {User} from "../../users/user.interface";
import {ClientInput} from "../dto/client-input";
import {Client} from "../interfaces/client.interface";
import {randomUUID} from "crypto";
import {use} from "passport";

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(ClientModel)
        private clientModel: typeof ClientModel
    ) {
    }

    async findAllForUser(userId:string) {
        return this.clientModel.findAll<ClientModel>({
            where: {
                userId: userId
            }
        });
    }

    async createClientForUser(userId: string, newClient: ClientInput) {
        const newOject = {
            userId: userId,
            id: randomUUID(),
            ...newClient
        }

        return this.clientModel.create<ClientModel>(newOject)
    }

    async updateClientForUser(userId:string, clientId:string, updateClient: ClientInput) {
        const client = await this.clientModel.findOne<ClientModel>({
            where: {
                userId: userId,
                clientIs: clientId
            }
        })

        return client.update(updateClient);
    }
}