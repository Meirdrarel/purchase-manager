import {SalesOrderModel} from "../sales/models/sales-order.model";
import {Client} from "../sales/interfaces/client.interface";
import {SalesInvoice} from "../sales/interfaces/sales-invoice.interface";

export interface UserInt {
    id: string;
    email: string;
    password: string;
    clients: Client[];
    salesOrders: SalesOrderModel[];
    salesInvoices: SalesInvoice[]
}