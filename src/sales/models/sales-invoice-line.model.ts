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
import {SalesInvoiceLine} from "../interfaces/sales-invoice-line.interface";
import {SalesOrderLineModel} from "./sales-order-line.model";
import {SalesInvoiceModel} from "./sales-invoice.model";

@Table({tableName: 'SalesInvoiceLines'})
export class SalesInvoiceLineModel extends Model implements SalesInvoiceLine {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    id: string;

    @Index({name:'InvoiceNum-line', unique: true})
    @AllowNull(false)
    @ForeignKey(() => SalesInvoiceModel)
    @Column(DataType.UUID)
    salesInvoiceId: string;

    @BelongsTo(() => SalesInvoiceModel, 'salesInvoiceId')
    salesInvoice: SalesInvoiceModel;

    @Index('InvoiceNum-line')
    @AllowNull(false)
    @Column(DataType.INTEGER)
    lineNumber: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    articleDesignation: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    quantity: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    priceExclTax: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    taxes: number

    @ForeignKey(() => SalesOrderLineModel)
    @Column(DataType.UUID)
    salesOrderLineId: string

    @BelongsTo(() => SalesOrderLineModel)
    salesOrderLine: SalesOrderLineModel
}