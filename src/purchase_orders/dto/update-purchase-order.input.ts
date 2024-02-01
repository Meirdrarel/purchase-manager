import {Field, InputType} from "@nestjs/graphql";
import {PurchaseOrder} from "../models/purchase-order.interface";

@InputType()
export class UpdatePurchaseOrderInput implements Partial<PurchaseOrder>{

    @Field({nullable: false})
    uuid: string;

    @Field({nullable: true})
    number: string;

    @Field({ nullable: true })
    client: string;
}