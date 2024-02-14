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
import {SalesOrderLine} from "../interfaces/sales-order-line.interface";
import {SalesOrderModel} from "./sales-order.model";

@Table({tableName: 'SalesOrderLines'})
export class SalesOrderLineModel extends Model implements SalesOrderLine {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id: string;

    @Index({name:'num-line', unique: true})
    @AllowNull(false)
    @Column
    purchaseNum: string;

    @Index('num-line')
    @AllowNull(false)
    @Column(DataType.INTEGER)
    lineNumber: number;

    @AllowNull(false)
    @Column
    articleDesignation: string;

    @AllowNull(false)
    @Column
    quantity: number;

    @ForeignKey(() => SalesOrderModel)
    @Column(DataType.UUID)
    purchaseOrderId: string

    @BelongsTo(() => SalesOrderModel, 'purchaseOrderId')
    user: SalesOrderModel;

}