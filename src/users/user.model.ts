import {Column, Model, PrimaryKey, Table, DataType, AllowNull, HasMany} from "sequelize-typescript";
import {SalesOrderModel} from "../sales/models/sales-order.model";
import {User} from "./user.interface";

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

    @HasMany(() => SalesOrderModel)
    purchaseOrders: SalesOrderModel[];

}