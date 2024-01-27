import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Model, PrimaryKey, Table, DataType, AllowNull} from "sequelize-typescript";

@Table
@ObjectType({ description: 'Purchase Order ' })
export class PurchaseOrder extends Model {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUIDV4)
    @Field(() => String, {nullable: false})
    uuid: string;

    @Column
    @Field(() => String,{nullable: false})
    number: string

    @Column
    @Field(() => String, {nullable: false})
    client: string

}