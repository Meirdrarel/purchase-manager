import {Injectable} from "@nestjs/common";
import {SalesOrderModel} from "./models/sales-order.model";
import {InjectModel} from "@nestjs/sequelize";
import {NewSalesOrderInput} from "./dto/new-sales-order.input";
import {randomUUID} from "crypto";
import {UpdateSalesOrderInput} from "./dto/update-sales-order.input";
import {use} from "passport";
import {SalesOrderLineModel} from "./models/sales-order-line.model";

@Injectable()
export class SalesOrderService {

    constructor(
        @InjectModel(SalesOrderModel)
        private purchaseOrderModel: typeof SalesOrderModel
    ) {
    }

    async findAllForUser(userId:string) : Promise<SalesOrderModel[]> {
        return this.purchaseOrderModel.findAll({
            where: {
                userId: userId
            },
            include: [SalesOrderLineModel],
        });
    }

    async findOneByNumberForUser(userId: string, number: string): Promise<SalesOrderModel> {
        return this.purchaseOrderModel.findOne({
            where: {
                userId: userId,
                number: number
            },
            include: [SalesOrderLineModel]
        });
    }

    async createSaleOrderForUser(userId: string, newPurchaseOrder: NewSalesOrderInput){
            const newObject = {
                userId: userId,
                id: randomUUID(),
                ...newPurchaseOrder
            };
            return this.purchaseOrderModel.create<SalesOrderModel>(newObject);
    }

    async updateSaleOrderForUser(userId: string, updatePurchaseOrder: UpdateSalesOrderInput) {
        const purchaseOrder = await this.purchaseOrderModel.findOne({
            where: {
                userId: userId,
                number: updatePurchaseOrder.uuid
            }
        });
        return purchaseOrder.update(updatePurchaseOrder);
    }
}