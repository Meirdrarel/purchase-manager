import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserInt} from "../users/user.interface";
import {jwtConstants} from "./auth.module";
import {InjectModel} from "@nestjs/sequelize";
import {RefreshTokenModel} from "./refresh-token.model";
import { NotFoundError } from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(RefreshTokenModel) protected refreshTokenModel: typeof RefreshTokenModel
    ) {
    }

    async createTokens(userId: string, ip: string) {
        const user = await this.usersService.findUserById(userId);

        const accessToken = await this.jwtService.signAsync({
            sub: userId,
            email: user.email
        }, {
            secret: jwtConstants.JWT_ACCESS_SECRET,
            expiresIn: '15m'
        });

        const lastRefreshToken = await this.refreshTokenModel.findOne({
            where: {
                userId: userId,
                ip: ip
            },
            order: [['createdAt', 'desc']]
        });

        let expiresIn : number;
        let expiresDate = new Date();
        if (lastRefreshToken) {
            expiresIn = (lastRefreshToken.expiresDate.getTime() - expiresDate.getTime()) / (1000 * 24 * 3600);
            expiresIn = Math.round(expiresIn * 1000) / 1000
            expiresDate.setTime(lastRefreshToken.expiresDate.getTime())
        } else {
            expiresIn = 7;
            expiresDate.setDate(expiresDate.getDate() + expiresIn)
        }

        const refreshToken = await this.jwtService.signAsync({
            sub: userId
        }, {
            secret: jwtConstants.JWT_REFRESH_SECRET,
            expiresIn: `${expiresIn}d`
        });

        await this.refreshTokenModel.create<RefreshTokenModel>({
            userId: userId,
            token: refreshToken,
            expiresDate: expiresDate,
            ip: ip
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async signIn(user: UserInt, ip: string) {
        await this.refreshTokenModel.destroy<RefreshTokenModel>({
            where: {
                userId: user.id,
                ip: ip
            }
        });
        return this.createTokens(user.id, ip);
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const userRefreshTokens = await this.refreshTokenModel.findAll<RefreshTokenModel>({
            where: {
                userId: userId
            },
            order: [['createdAt', 'desc']],
            raw: true
        });

        const indexes = userRefreshTokens.findIndex(
            (userRefreshToken, index) =>
                userRefreshToken.token === refreshToken
        );

        if (indexes !== 0) {
            await this.refreshTokenModel.destroy({
                where: {
                    userId: userId
                }
            });
        }

        return indexes === 0 && Boolean(userRefreshTokens)
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async logOut(userId: string) {
        return this.refreshTokenModel.destroy({
            where: {
                userId: userId
            }
        })
    }
}
