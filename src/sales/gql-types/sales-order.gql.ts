import {Field, ObjectType} from "@nestjs/graphql";
import {SalesOrderLine} from "./sales-order-line.gql";

@ObjectType({description: 'Sales Order'})
export class SalesOrder {
    @Field(() => String, {nullable: false})
    id: string;

    @Field(() => String, {nullable: false})
    client: string;

    @Field(() => String, {nullable: false})
    number: string;

    @Field(() => [SalesOrderLine])
    lines: SalesOrderLine[]

}