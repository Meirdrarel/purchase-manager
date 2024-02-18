import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType({description: 'Client'})
export class Client {
    @Field(() => String, {nullable: false})
    id: string

    @Field(() => String, {nullable: false})
    corporateName: string
}