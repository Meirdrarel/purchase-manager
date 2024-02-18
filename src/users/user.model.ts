import {Column, Model, PrimaryKey, Table, DataType, AllowNull, HasMany} from "sequelize-typescript";
import {SalesOrderModel} from "../sales/models/sales-order.model";
import {User} from "./user.interface";
import {ClientModel} from "../sales/models/client.model";
import {SalesInvoiceModel} from "../sales/models/sales-invoice.model";

@Table({tableName: 'Users'})
export class UserModel extends Model implements User {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @HasMany(() => ClientModel)
    clients: ClientModel[];

    @HasMany(() => SalesOrderModel)
    salesOrders: SalesOrderModel[];

    @HasMany(() => SalesInvoiceModel)
    salesInvoices: SalesInvoiceModel[];
}