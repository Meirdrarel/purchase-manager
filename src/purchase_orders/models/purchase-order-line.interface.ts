export interface PurchaseOrderLine {
    id: string;
    purchaseOrderId: string;
    lineNumber: number;
    purchaseNum: string;
    articleDesignation: string;
    quantity: number;
}