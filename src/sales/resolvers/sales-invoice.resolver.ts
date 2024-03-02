import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/guards/gql-auth.guard";
import {CurrentUser} from "../../users/current-user.decorator";
import {UserInt} from "../../users/user.interface";
import {SalesInvoice} from "../gql-types/sales-invoice.gql";
import {SalesInvoiceService} from "../services/sales-invoice.service";
import {NewSalesInvoiceInput} from "../dto/new-sales-invoice.input";

@Resolver(() => SalesInvoice)
export class SalesInvoiceResolver {

    constructor(
        private readonly salesInvoiceService: SalesInvoiceService
    ) {
    }

    @Query(() => [SalesInvoice], {name: 'getAllSalesInvoices'})
    @UseGuards(GqlAuthGuard)
    async getAllSalesInvoices(@CurrentUser() user: UserInt): Promise<SalesInvoice[]> {
        return this.salesInvoiceService.findAllForUser(user.id);
    }

    @Mutation(() => SalesInvoice, {name: 'createSalesInvoice'})
    @UseGuards(GqlAuthGuard)
    async createSalesInvoice(@CurrentUser() user: UserInt,
                             @Args('newInvoice') newInvoice: NewSalesInvoiceInput) {
        return this.salesInvoiceService.createInvoiceForUser(user.id, newInvoice);
    }
}