import {Field, InputType} from "@nestjs/graphql";
import {SalesOrder} from "../interfaces/sales-order.interface";

@InputType()
export class UpdateSalesOrderInput implements Partial<SalesOrder>{

    @Field({nullable: false})
    uuid: string;

    @Field({nullable: true})
    number: string;

    @Field({ nullable: true })
    client: string;
}