import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {UsersService} from "./users/users.service";

@Controller()
export class AppController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/signup')
    async addUser(
        @Body('email') email: string,
        @Body('password') userPassword: string
    ) {
        return this.usersService.addUser(email, userPassword)
    }
}