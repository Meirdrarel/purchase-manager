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
import {SalesOrder} from "../interfaces/sales-order.interface";
import {SalesOrderLineModel} from "./sales-order-line.model";
import {SalesOrderLine} from "../interfaces/sales-order-line.interface";

@Table({tableName: 'SalesOrders'})
export class SalesOrderModel extends Model implements SalesOrder {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id: string;

    @Index({name: 'userId-client-number', unique: true})
    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: number;

    @BelongsTo(() => UserModel, 'userId')
    user: UserModel;

    @Index('userId-client-number')
    @Column
    client: string;

    @Index('userId-client-number')
    @Column
    number: string;

    @HasMany(() => SalesOrderLineModel)
    lines: SalesOrderLine[]

}