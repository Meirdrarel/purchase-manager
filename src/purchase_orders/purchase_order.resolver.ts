import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {PurchaseOrder} from "./models/porder.model";
import {PurchaseOrderService} from "./purchase_order.service";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-auth.guard";
import {CurrentUser} from "../users/current-user.decorator";
import {UserModel} from "../users/user.model";


@Resolver(() => PurchaseOrder)
export class PurchaseOrderResolver{

    constructor(
        private readonly purchaseOrderService: PurchaseOrderService
    ) {
    }

    @Query(() => [PurchaseOrder])
    @UseGuards(GqlAuthGuard)
    async getAllPurchaseOrders(@CurrentUser() user: UserModel): Promise<PurchaseOrder[]> {
        return this.purchaseOrderService.findAllForUser(user.id);
    }


    @Query(() => PurchaseOrder)
    @UseGuards(GqlAuthGuard)
    async getPurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('number', { type: () => String }) number: string
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.findOneByNumberForUser(user.id, number);
    }

    @Mutation(() => PurchaseOrder)
    @UseGuards(GqlAuthGuard)
    async createPurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('newPurchaseOrder') newPurchaseOrder: NewPurchaseOrderInput
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.createPurchaseOrderForUser(user.id, newPurchaseOrder)
    }

    @Mutation(() => PurchaseOrder)
    @UseGuards(GqlAuthGuard)
    async updatePurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('updatePurchaseOrder') purchaseOrder: UpdatePurchaseOrderInput
    ): Promise<PurchaseOrder> {
        return this.purchaseOrderService.updatePurchaseOrderForUser(user.id, purchaseOrder)
    }
}