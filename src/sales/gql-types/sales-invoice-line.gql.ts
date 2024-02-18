import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType({ description: 'Sales Invoices lines' })
export class SalesInvoiceLine {

    @Field(() => String)
    id: string;

    @Field(() => Int)
    lineNumber: number;

    @Field(() => String)
    articleDesignation: string;

    @Field(() => Number)
    quantity: number;

    @Field(() => Number)
    priceExclTax: number;

    @Field(() => Number)
    taxes: number

    @Field(() => String, { nullable: true })
    salesOrderLineId: string;
}