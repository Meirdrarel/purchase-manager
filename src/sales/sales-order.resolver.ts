import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {SalesOrderService} from "./sales-order.service";
import {NewSalesOrderInput} from "./dto/new-sales-order.input";
import {UpdateSalesOrderInput} from "./dto/update-sales-order.input";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/gql-auth.guard";
import {CurrentUser} from "../users/current-user.decorator";
import {SalesOrder} from "./gql-types/sales-order.gql";
import {User} from "../users/user.interface";


@Resolver(() => SalesOrder)
export class SalesOrderResolver {

    constructor(
        private readonly purchaseOrderService: SalesOrderService
    ) {
    }

    @Query(() => [SalesOrder])
    @UseGuards(GqlAuthGuard)
    async getAllSalesOrders(@CurrentUser() user: User): Promise<SalesOrder[]> {
        return this.purchaseOrderService.findAllForUser(user.id);
    }


    @Query(() => SalesOrder, {name: 'SalesOrder'})
    @UseGuards(GqlAuthGuard)
    async getSalesOrder(
        @CurrentUser() user: User,
        @Args('number', { type: () => String }) number: string
    ): Promise<SalesOrder> {
        return this.purchaseOrderService.findOneByNumberForUser(user.id, number);
    }

    @Mutation(() => SalesOrder)
    @UseGuards(GqlAuthGuard)
    async createSalesOrder(
        @CurrentUser() user: User,
        @Args('newSalesOrder') newSalesOrder: NewSalesOrderInput
    ): Promise<SalesOrder> {
        return this.purchaseOrderService.createSaleOrderForUser(user.id, newSalesOrder)
    }

    @Mutation(() => SalesOrder)
    @UseGuards(GqlAuthGuard)
    async updateSalesOrder(
        @CurrentUser() user: User,
        @Args('updateSalesOrder') salesOrder: UpdateSalesOrderInput
    ): Promise<SalesOrder> {
        return this.purchaseOrderService.updateSaleOrderForUser(user.id, salesOrder)
    }
}