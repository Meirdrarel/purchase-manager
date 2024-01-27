import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {PurchaseOrder} from "./entities/porder.entity";
import {PurchaseOrderService} from "./purchase_order.service";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";


@Resolver(() => PurchaseOrder)
export class PurchaseOrderResolver{

    constructor(
        private readonly purchaseOrderService: PurchaseOrderService
    ) {
    }

    @Query(() => [PurchaseOrder])
    async getAllPurchaseOrders(): Promise<PurchaseOrder[]> {
        return this.purchaseOrderService.findAll();
    }

    @Query(() => PurchaseOrder)
    async getPurchaseOrder(
        @Args('number', { type: () => String }) number: string
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.findOneByNumber(number);
    }

    @Mutation(() => PurchaseOrder)
    async createPurchaseOrder(
        @Args('newPurchaseOrder') newPurchaseOrder: NewPurchaseOrderInput
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.createPurchaseOrder(newPurchaseOrder)
    }

    @Mutation(() => PurchaseOrder)
    async updatePurchaseOrder(
        @Args('updatePurchaseOrder') purchaseOrder: UpdatePurchaseOrderInput
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.updatePurchaseOrder(purchaseOrder)
    }
}