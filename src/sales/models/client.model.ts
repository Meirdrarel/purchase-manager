import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Index,
    Model,
    PrimaryKey, Table
} from "sequelize-typescript";
import {Client} from "../interfaces/client.interface";
import {UserModel} from "../../users/user.model";
import {SalesOrderModel} from "./sales-order.model";
import {SalesInvoiceModel} from "./sales-invoice.model";

@Table({tableName: 'Client'})
export class ClientModel extends Model implements Client{

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id:string;

    @AllowNull(false)
    @Column(DataType.STRING)
    corporateName: string;

    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => UserModel, 'userId')
    user: UserModel;

    @HasMany(() => SalesOrderModel, 'clientId')
    salesOrders: SalesOrderModel[];

    @HasMany(() => SalesInvoiceModel, 'clientId')
    salesInvoices: SalesInvoiceModel[]
}