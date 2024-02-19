import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {RefreshTokenAuthGuard} from "./guards/refresh-token-auth.guard";
import {AccessTokenAuthGuard} from "./guards/access-token-auth.guard.";

@Controller('/auth')
export class AuthController {

    constructor(
        protected authService: AuthService,
        protected usersService: UsersService
    ) {
    }

    @Post('/signup')
    async addUser(
        @Body('email') email: string,
        @Body('password') userPassword: string
    ) {
        return this.usersService.addUser(email, userPassword)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
        return this.authService.signIn(req.user);
    }

    @UseGuards(RefreshTokenAuthGuard)
    @Post('/refresh')
    async refresh(@Request() req: any) {
        return this.authService.getTokens(req.user.sub)
    }

    @UseGuards(AccessTokenAuthGuard)
    @Post('/logout')
    async logOut(@Request() req: any) {
        return this.authService.logOut(req.user.id)
    }
}