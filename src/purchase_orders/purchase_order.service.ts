import {Injectable} from "@nestjs/common";
import {PurchaseOrder} from "./models/porder.model";
import {InjectModel} from "@nestjs/sequelize";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {randomUUID} from "crypto";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";
import {use} from "passport";

@Injectable()
export class PurchaseOrderService {

    constructor(
        @InjectModel(PurchaseOrder)
        private purchaseOrderModel: typeof PurchaseOrder
    ) {
    }

    async findAllForUser(userId:string) : Promise<PurchaseOrder[]> {
        return this.purchaseOrderModel.findAll({
            where: {
                userId: userId
            }
        });
    }

    async findOneByNumberForUser(userId: string, number: string): Promise<PurchaseOrder> {
        return this.purchaseOrderModel.findOne({
            where: {
                userId: userId,
                number: number
            }
        });
    }

    async createPurchaseOrderForUser(userId: string, newPurchaseOrder: NewPurchaseOrderInput){
            const newObject = {
                userId: userId,
                id: randomUUID(),
                ...newPurchaseOrder
            };
            return this.purchaseOrderModel.create<PurchaseOrder>(newObject);
    }

    async updatePurchaseOrderForUser(userId: string, updatePurchaseOrder: UpdatePurchaseOrderInput) {
        const purchaseOrder = await this.purchaseOrderModel.findOne({
            where: {
                userId: userId,
                number: updatePurchaseOrder.uuid
            }
        });
        return purchaseOrder.update(updatePurchaseOrder);
    }
}