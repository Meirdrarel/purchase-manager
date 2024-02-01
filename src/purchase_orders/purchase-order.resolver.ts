import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {PurchaseOrderModel} from "./models/purchase-order.model";
import {PurchaseOrderService} from "./purchase-order.service";
import {NewPurchaseOrderInput} from "./dto/new-purchase-order.input";
import {UpdatePurchaseOrderInput} from "./dto/update-purchase-order.input";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/gql-auth.guard";
import {CurrentUser} from "../users/current-user.decorator";
import {UserModel} from "../users/user.model";


@Resolver(() => PurchaseOrderModel)
export class PurchaseOrderResolver{

    constructor(
        private readonly purchaseOrderService: PurchaseOrderService
    ) {
    }

    @Query(() => [PurchaseOrderModel])
    @UseGuards(GqlAuthGuard)
    async getAllPurchaseOrders(@CurrentUser() user: UserModel): Promise<PurchaseOrderModel[]> {
        return this.purchaseOrderService.findAllForUser(user.id);
    }


    @Query(() => PurchaseOrderModel)
    @UseGuards(GqlAuthGuard)
    async getPurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('number', { type: () => String }) number: string
    ): Promise<PurchaseOrderModel> {
        return this.purchaseOrderService.findOneByNumberForUser(user.id, number);
    }

    @Mutation(() => PurchaseOrderModel)
    @UseGuards(GqlAuthGuard)
    async createPurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('newPurchaseOrder') newPurchaseOrder: NewPurchaseOrderInput
    ): Promise<PurchaseOrderModel> {
        return this.purchaseOrderService.createPurchaseOrderForUser(user.id, newPurchaseOrder)
    }

    @Mutation(() => PurchaseOrderModel)
    @UseGuards(GqlAuthGuard)
    async updatePurchaseOrder(
        @CurrentUser() user: UserModel,
        @Args('updatePurchaseOrder') purchaseOrder: UpdatePurchaseOrderInput
    ): Promise<PurchaseOrderModel> {
        return this.purchaseOrderService.updatePurchaseOrderForUser(user.id, purchaseOrder)
    }
}