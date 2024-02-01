import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {PurchaseOrderLine} from "./purchase-order-line.interface";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {PurchaseOrderModel} from "./purchase-order.model";

@Table({tableName: 'PurchaseOrderLines'})
@ObjectType({ description: 'Purchase Order lines' })
export class PurchaseOrderLineModel extends Model implements PurchaseOrderLine {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    @Field(() => String)
    id: string;

    @Index({name:'num-line', unique: true})
    @AllowNull(false)
    @Column
    @Field(() => String)
    purchaseNum: string;

    @Index('num-line')
    @AllowNull(false)
    @Column(DataType.INTEGER)
    @Field(() => Int)
    lineNumber: number;

    @AllowNull(false)
    @Column
    @Field(() => String)
    articleDesignation: string;

    @AllowNull(false)
    @Column
    @Field(() => Number)
    quantity: number;

    @ForeignKey(() => PurchaseOrderModel)
    @Column(DataType.UUID)
    purchaseOrderId: string

    @BelongsTo(() => PurchaseOrderModel, 'purchaseOrderId')
    user: PurchaseOrderModel;

}