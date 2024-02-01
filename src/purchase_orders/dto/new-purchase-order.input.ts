import { Field, InputType } from '@nestjs/graphql';
import {PurchaseOrder} from "../models/purchase-order.interface";

@InputType()
export class NewPurchaseOrderInput implements Partial<PurchaseOrder> {
    @Field({nullable: false})
    number: string

    @Field({ nullable: false })
    client: string
}