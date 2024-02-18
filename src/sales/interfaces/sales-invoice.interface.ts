import {SalesInvoiceLine} from "./sales-invoice-line.interface";

export interface SalesInvoice {
    id: string;
    userId: string;
    clientId: string;
    number: string;
    reference: string;
    date: Date;
    lines: Partial<SalesInvoiceLine>[]
}