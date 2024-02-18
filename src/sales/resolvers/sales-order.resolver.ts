import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {SalesOrderService} from "../services/sales-order.service";
import {NewSalesOrderInput} from "../dto/new-sales-order.input";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/guards/gql-auth.guard";
import {CurrentUser} from "../../users/current-user.decorator";
import {SalesOrder} from "../gql-types/sales-order.gql";
import {User} from "../../users/user.interface";


@Resolver(() => SalesOrder)
export class SalesOrderResolver {

    constructor(
        private readonly salesOrderService: SalesOrderService
    ) {
    }

    @Query(() => [SalesOrder], {name: 'getAllSalesOrders'})
    @UseGuards(GqlAuthGuard)
    async getAllSalesOrders(@CurrentUser() user: User): Promise<SalesOrder[]> {
        return this.salesOrderService.findAllForUser(user.id);
    }


    @Query(() => SalesOrder, {name: 'getSalesOrderById'})
    @UseGuards(GqlAuthGuard)
    async getSalesOrder(
        @CurrentUser() user: User,
        @Args('number', { type: () => String }) number: string
    ): Promise<SalesOrder> {
        return this.salesOrderService.findOneByNumberForUser(user.id, number);
    }

    @Mutation(() => SalesOrder)
    @UseGuards(GqlAuthGuard)
    async createSalesOrder(
        @CurrentUser() user: User,
        @Args('newSalesOrder') newSalesOrder: NewSalesOrderInput
    ): Promise<SalesOrder> {
        return this.salesOrderService.createSaleOrderForUser(user.id, newSalesOrder)
    }
}