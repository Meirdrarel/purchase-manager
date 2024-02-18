import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {User} from "../users/user.interface";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async createAccessToken(user: User) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload, {expiresIn: '15m'}),
        };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
