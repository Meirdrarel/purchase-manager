import {Field, InputType, Int} from '@nestjs/graphql';
import {SalesOrder} from "../interfaces/sales-order.interface";
import {SalesOrderLine} from "../interfaces/sales-order-line.interface";


@InputType()
export class NewSalesOrderInput implements Partial<SalesOrder> {
    @Field(() => String, {nullable: false})
    clientId: string;

    @Field(() => String, {nullable: false})
    number: string;

    @Field(() => String, {nullable: true})
    reference: string

    @Field(() => Date)
    date: Date;

    @Field(() => [NewSalesOrderLineInput])
    lines: NewSalesOrderLineInput[]
}

@InputType()
export class NewSalesOrderLineInput implements Partial<SalesOrderLine> {

    @Field(() => Int)
    lineNumber: number;

    @Field(() => String)
    articleDesignation: string;

    @Field(() => Number)
    quantity: number;
}