import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";

@Controller('/api')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
        return this.authService.createAccessToken(req.user);
    }

    @Post('/signup')
    async addUser(
        @Body('email') email: string,
        @Body('password') userPassword: string
    ) {
        return this.usersService.addUser(email, userPassword)
    }
}