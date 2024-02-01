import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/guards/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {UsersService} from "./users/users.service";

@Controller('/api')
export class AppController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
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