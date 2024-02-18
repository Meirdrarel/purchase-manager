import {Field, ObjectType} from "@nestjs/graphql";
import {Client} from "./client.gql";
import {SalesInvoiceLine} from "./sales-invoice-line.gql";

@ObjectType({description: 'Sales Invoices'})
export class SalesInvoice {
    @Field(() => String, {nullable: false})
    id: string;

    @Field(() => Client, {nullable: false})
    client: Client;

    @Field(() => String, {nullable: false})
    number: string;

    @Field(() => String, {nullable: true})
    reference: string

    @Field(() => Date)
    date: Date;

    @Field(() => [SalesInvoiceLine])
    lines: SalesInvoiceLine[]

}