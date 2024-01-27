import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class UpdatePurchaseOrderInput {

    @Field({nullable: false})
    uuid: string

    @Field({nullable: true})
    number: string

    @Field({ nullable: true })
    client: string
}