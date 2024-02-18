import { Field, InputType } from '@nestjs/graphql';
import {Client} from "../interfaces/client.interface";

@InputType()
export class ClientInput implements Partial<Client> {

    @Field(() => String, { nullable: false })
    corporateName: string
}