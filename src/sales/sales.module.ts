import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {SalesOrderModel} from "./models/sales-order.model";
import {SalesOrderService} from "./sales-order.service";
import {SalesOrderResolver} from "./sales-order.resolver";
import {SalesOrderLineModel} from "./models/sales-order-line.model";


@Module({
    imports: [SequelizeModule.forFeature([SalesOrderModel, SalesOrderLineModel])],
    exports: [SequelizeModule],
    providers: [SalesOrderService, SalesOrderResolver],
})
export class SalesModule {}