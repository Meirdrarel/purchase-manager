export interface SalesOrderLine {
    id: string;
    purchaseOrderId: string;
    lineNumber: number;
    purchaseNum: string;
    articleDesignation: string;
    quantity: number;
}