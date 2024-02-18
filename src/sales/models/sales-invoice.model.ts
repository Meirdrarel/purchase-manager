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
import {ClientModel} from "./client.model";
import {SalesInvoiceLineModel} from "./sales-invoice-line.model";
import {SalesInvoice} from "../interfaces/sales-invoice.interface";

@Table({tableName: 'SalesInvoice'})
export class SalesInvoiceModel extends Model implements SalesInvoice {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id: string;

    @Index({name: 'userId-clientId-invoiceNum', unique: true})
    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => UserModel, 'userId')
    user: UserModel;

    @Index('userId-clientId-invoiceNum')
    @ForeignKey(() => ClientModel)
    @Column(DataType.UUID)
    clientId: string;

    @BelongsTo(() => ClientModel, 'clientId')
    client: ClientModel;

    @Index('userId-clientId-invoiceNum')
    @Column(DataType.STRING)
    number: string;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.STRING)
    reference: string;

    @HasMany(() => SalesInvoiceLineModel)
    lines: SalesInvoiceLineModel[]

}