import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {PurchaseOrderModel} from "./models/purchase-order.model";
import {PurchaseOrderService} from "./purchase-order.service";
import {PurchaseOrderResolver} from "./purchase-order.resolver";
import {PurchaseOrderLineModel} from "./models/purchase-order-line.model";


@Module({
    imports: [SequelizeModule.forFeature([PurchaseOrderModel, PurchaseOrderLineModel])],
    exports: [SequelizeModule],
    providers: [PurchaseOrderService, PurchaseOrderResolver],
})
export class PurchaseModule {}