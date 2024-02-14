import {SalesOrderLine} from "./sales-order-line.interface";

export interface SalesOrder {
    id: string;
    userId?: number;
    client: string;
    number: string;
    lines: SalesOrderLine[]
}