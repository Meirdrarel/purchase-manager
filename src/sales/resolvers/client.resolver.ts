import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Client} from "../gql-types/client.gql";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/guards/gql-auth.guard";
import {CurrentUser} from "../../users/current-user.decorator";
import {UserInt} from "../../users/user.interface";
import {ClientService} from "../services/client.service";
import {ClientInput} from "../dto/client-input";

@Resolver(() => Client)
export class ClientResolver {


    constructor(
        private readonly clientService: ClientService
    ) {
    }
    @Query(() => [Client], {name: 'getAllClients'})
    @UseGuards(GqlAuthGuard)
    async getAllClients(@CurrentUser() user: UserInt): Promise<Client[]> {
        console.log(user);
        return this.clientService.findAllForUser(user.id);
    }

    @Mutation(() => Client, {name: 'createClient'})
    @UseGuards(GqlAuthGuard)
    async createClient(@CurrentUser() user: UserInt,
                       @Args('newClient') newClient: ClientInput) {
        return this.clientService.createClientForUser(user.id, newClient);
    }

    @Mutation(() => Client, {name: 'updateClient'})
    @UseGuards(GqlAuthGuard)
    async updateClient(@CurrentUser() user: UserInt,
                       @Args('clientId') clientId: string,
                       @Args('updateClient') updateClient: ClientInput) {
        return this.clientService.updateClientForUser(user.id, clientId, updateClient);
    }
}