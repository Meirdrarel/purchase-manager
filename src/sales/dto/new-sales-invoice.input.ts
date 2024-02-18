import {Field, InputType} from "@nestjs/graphql";
import {SalesInvoice} from "../interfaces/sales-invoice.interface";
import {SalesInvoiceLine} from "../interfaces/sales-invoice-line.interface";

@InputType()
export class NewSalesInvoiceInput implements Partial<SalesInvoice> {

    @Field(() => String,{ nullable: false })
    clientId: string

    @Field(() => String,{ nullable: true })
    reference: string;

    @Field(() => Date, { nullable: false })
    date: Date;

    @Field(() => String, { nullable: false })
    number: string;

    @Field(() => [NewSalesInvoiceLineInput])
    lines: NewSalesInvoiceLineInput[]
}

@InputType()
export class NewSalesInvoiceLineInput implements Partial<SalesInvoiceLine> {

    @Field(() => Number, { nullable: false })
    lineNumber: number

    @Field(() => String, { nullable: false })
    articleDesignation: string

    @Field(() => Number, { nullable: false })
    quantity: number

    @Field(() => Number, { nullable: false })
    priceExclTax: number

    @Field(() => Number, { nullable: false })
    taxes: number

    @Field(() => String, { nullable: true })
    salesOrderLineId: string
}