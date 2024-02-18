export interface SalesInvoiceLine {
    id: string;
    salesInvoiceId: string;
    lineNumber: number;
    articleDesignation: string;
    quantity: number;
    priceExclTax: number;
    taxes: number
    salesOrderLineId: string;
}