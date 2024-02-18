import {Injectable} from "@nestjs/common";
import {SalesOrderModel} from "../models/sales-order.model";
import {InjectModel} from "@nestjs/sequelize";
import {NewSalesOrderInput} from "../dto/new-sales-order.input";
import {randomUUID} from "crypto";
import {SalesOrderLineModel} from "../models/sales-order-line.model";

@Injectable()
export class SalesOrderService {

    constructor(
        @InjectModel(SalesOrderModel)
        private salesOrderModel: typeof SalesOrderModel
    ) {
    }

    async findAllForUser(userId: string): Promise<SalesOrderModel[]> {
        return this.salesOrderModel.findAll({
            where: {
                userId: userId
            },
            include: [SalesOrderLineModel],
        });
    }

    async findOneByNumberForUser(userId: string, number: string): Promise<SalesOrderModel> {
        return this.salesOrderModel.findOne({
            where: {
                userId: userId,
                number: number
            },
            include: [SalesOrderLineModel]
        });
    }

    async createSaleOrderForUser(userId: string, newSalesOrder: NewSalesOrderInput) {
        const salesOrderId = randomUUID();
        const newLines = newSalesOrder.lines.map(line => {
            return {
                id: randomUUID(),
                salesOrderId: salesOrderId,
                ...line
            }
        })
        const newObject = {
            userId: userId,
            id: salesOrderId,
            ...newSalesOrder,
            lines: newLines
        };
        return this.salesOrderModel.create<SalesOrderModel>(newObject, {
            include: [
                {
                    model: SalesOrderLineModel,
                    as: 'lines'
                }
            ]
        });
    }
}