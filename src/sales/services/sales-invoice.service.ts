import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {SalesInvoiceModel} from "../models/sales-invoice.model";
import {SalesInvoiceLineModel} from "../models/sales-invoice-line.model";
import {randomUUID} from "crypto";
import {NewSalesInvoiceInput} from "../dto/new-sales-invoice.input";

@Injectable()
export class SalesInvoiceService {

    constructor(
        @InjectModel(SalesInvoiceModel)
        private salesInvoiceModel: typeof SalesInvoiceModel
    ) {
    }

    async findAllForUser(userId: string) {
        return this.salesInvoiceModel.findAll<SalesInvoiceModel>({
            where: {
                userId: userId
            }
        });
    }

    async createInvoiceForUser(userId: string, newInvoice: NewSalesInvoiceInput): Promise<SalesInvoiceModel | string> {
        const salesInvoiceId = randomUUID();
        const newLines = newInvoice.lines.map((line) => {
            return {
                id: randomUUID(),
                salesInvoiceId: salesInvoiceId,
                ...line
            }
        })
        const newObject = {
            userId: userId,
            id: salesInvoiceId,
            ...newInvoice,
            lines: newLines
        }

        return this.salesInvoiceModel.create<SalesInvoiceModel>(newObject, {
            include: [
                {
                    model: SalesInvoiceLineModel,
                    as: 'lines'
                }
            ]
        });
    }
}