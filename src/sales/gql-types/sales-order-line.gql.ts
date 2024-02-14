import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType({ description: 'Sales Order lines' })
export class SalesOrderLine {

    @Field(() => String)
    id: string;

    @Field(() => String)
    purchaseNum: string;

    @Field(() => Int)
    lineNumber: number;

    @Field(() => String)
    articleDesignation: string;

    @Field(() => Number)
    quantity: number;

}