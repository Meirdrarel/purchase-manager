import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewPurchaseOrderInput {
    @Field({nullable: false})
    number: string

    @Field({ nullable: false })
    client: string
}