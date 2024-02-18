import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {SalesOrderModel} from "./models/sales-order.model";
import {SalesOrderService} from "./services/sales-order.service";
import {SalesOrderResolver} from "./resolvers/sales-order.resolver";
import {SalesOrderLineModel} from "./models/sales-order-line.model";
import {ClientModel} from "./models/client.model";
import {SalesInvoiceLineModel} from "./models/sales-invoice-line.model";
import {SalesInvoiceModel} from "./models/sales-invoice.model";
import {SalesInvoiceService} from "./services/sales-invoice.service";
import {SalesInvoiceResolver} from "./resolvers/sales-invoice.resolver";
import {ClientResolver} from "./resolvers/client.resolver";
import {ClientService} from "./services/client.service";


@Module({
    imports: [SequelizeModule.forFeature([
        ClientModel,
        SalesOrderModel,
        SalesOrderLineModel,
        SalesInvoiceModel,
        SalesInvoiceLineModel
    ])],
    exports: [SequelizeModule],
    providers: [
        ClientService,
        ClientResolver,
        SalesOrderService,
        SalesOrderResolver,
        SalesInvoiceService,
        SalesInvoiceResolver
    ],
})
export class SalesModule {}