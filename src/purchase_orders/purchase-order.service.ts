import {Injectable} from "@nestjs/common";
import {PurchaseOrderModel} from "./models/purchase-order.model";
import {InjectModel} from "@nestjs/sequelize";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {randomUUID} from "crypto";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";
import {use} from "passport";
import {PurchaseOrderLineModel} from "./models/purchase-order-line.model";

@Injectable()
export class PurchaseOrderService {

    constructor(
        @InjectModel(PurchaseOrderModel)
        private purchaseOrderModel: typeof PurchaseOrderModel
    ) {
    }

    async findAllForUser(userId:string) : Promise<PurchaseOrderModel[]> {
        return this.purchaseOrderModel.findAll({
            where: {
                userId: userId
            },
            include: [PurchaseOrderLineModel]
        });
    }

    async findOneByNumberForUser(userId: string, number: string): Promise<PurchaseOrderModel> {
        return this.purchaseOrderModel.findOne({
            where: {
                userId: userId,
                number: number
            },
            include: [PurchaseOrderLineModel]
        });
    }

    async createPurchaseOrderForUser(userId: string, newPurchaseOrder: NewPurchaseOrderInput){
            const newObject = {
                userId: userId,
                id: randomUUID(),
                ...newPurchaseOrder
            };
            return this.purchaseOrderModel.create<PurchaseOrderModel>(newObject);
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