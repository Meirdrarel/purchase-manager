import {PurchaseOrderModel} from "../purchase_orders/models/purchase-order.model";

export interface User {
    id: string;
    email: string;
    password: string;
    purchaseOrders: PurchaseOrderModel[];
}