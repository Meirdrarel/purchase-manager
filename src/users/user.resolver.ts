import {Query, Resolver} from "@nestjs/graphql";
import {User} from "./user.gql";
import {UsersService} from "./users.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/gql-auth.guard";
import {CurrentUser} from "./current-user.decorator";
import {UserInt} from "./user.interface";

@Resolver(() => User)
export class UserResolver {

    constructor(protected readonly userService: UsersService) {
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async getMe(@CurrentUser() user: UserInt) {
        return this.userService.findUserById(user.id);
    }
}