import {UserModel} from "../../users/user.model";
import {PurchaseOrderLine} from "./purchase-order-line.interface";

export interface PurchaseOrder {
    id: string;
    userId: number;
    client: string;
    number: string;
    lines: PurchaseOrderLine[]
}