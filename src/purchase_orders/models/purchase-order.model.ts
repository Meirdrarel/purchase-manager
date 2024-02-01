import {Field, ObjectType} from "@nestjs/graphql";
import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {UserModel} from "../../users/user.model";
import {PurchaseOrder} from "./purchase-order.interface";
import {PurchaseOrderLineModel} from "./purchase-order-line.model";
import {PurchaseOrderLine} from "./purchase-order-line.interface";

@Table({tableName: 'PurchaseOrders'})
@ObjectType({description: 'Purchase Order'})
export class PurchaseOrderModel extends Model implements PurchaseOrder {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    @Field(() => String, {nullable: false})
    id: string;

    @Index({name: 'userId-client-number', unique: true})
    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: number;

    @BelongsTo(() => UserModel, 'userId')
    user: UserModel;

    @Index('userId-client-number')
    @Column
    @Field(() => String, {nullable: false})
    client: string;

    @Index('userId-client-number')
    @Column
    @Field(() => String, {nullable: false})
    number: string;

    @HasMany(() => PurchaseOrderLineModel)
    @Field(() => [PurchaseOrderLineModel])
    lines: PurchaseOrderLine[]

}