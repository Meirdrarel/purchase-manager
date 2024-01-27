import {Injectable} from "@nestjs/common";
import {PurchaseOrder} from "./entities/porder.entity";
import {InjectModel} from "@nestjs/sequelize";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {randomUUID} from "crypto";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";

@Injectable()
export class PurchaseOrderService {

    constructor(
        @InjectModel(PurchaseOrder)
        private purchaseOrderModel: typeof PurchaseOrder
    ) {
    }

    async findAll() : Promise<PurchaseOrder[]> {
        return this.purchaseOrderModel.findAll();
    }

    async findOneByNumber(number: string): Promise<PurchaseOrder> {
        return this.purchaseOrderModel.findOne({
            where: {
                number: number
            }
        });
    }

    async createPurchaseOrder(newPurchaseOrder: NewPurchaseOrderInput){
            const newObject = {
                uuid: randomUUID(),
                ...newPurchaseOrder
            };
            return this.purchaseOrderModel.create<PurchaseOrder>(newObject);
    }

    async updatePurchaseOrder(updatePurchaseOrder: UpdatePurchaseOrderInput) {
        const purchaseOrder = await this.purchaseOrderModel.findByPk(updatePurchaseOrder.uuid);
        return purchaseOrder.update(updatePurchaseOrder);
    }
}