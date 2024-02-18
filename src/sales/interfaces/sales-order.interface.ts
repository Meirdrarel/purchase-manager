import {SalesOrderLine} from "./sales-order-line.interface";

export interface SalesOrder {
    id: string;
    userId: string;
    clientId: string;
    number: string;
    reference: string;
    lines: Partial<SalesOrderLine>[]
}