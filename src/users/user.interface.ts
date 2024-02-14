import {SalesOrderModel} from "../sales/models/sales-order.model";

export interface User {
    id: string;
    email: string;
    password: string;
    purchaseOrders: SalesOrderModel[];
}