import {PurchaseOrder} from "../purchase_orders/models/porder.model";

export interface User {
    id: string;
    email: string;
    password: string;
    purchaseOrders: PurchaseOrder[];
}