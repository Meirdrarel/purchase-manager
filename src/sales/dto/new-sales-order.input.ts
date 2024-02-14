import { Field, InputType } from '@nestjs/graphql';
import {SalesOrder} from "../interfaces/sales-order.interface";

@InputType()
export class NewSalesOrderInput implements Partial<SalesOrder> {
    @Field({nullable: false})
    number: string

    @Field({ nullable: false })
    client: string
}