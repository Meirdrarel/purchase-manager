import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {User} from "../users/user.interface";
import {jwtConstants} from "./auth.module";
import {InjectModel} from "@nestjs/sequelize";
import {RefreshTokenModel} from "./refresh-token.model";
import {randomUUID} from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(RefreshTokenModel) protected refreshTokenModel: typeof RefreshTokenModel
    ) {
    }

    async getTokens(userId: string) {
        const user =  await this.usersService.findUserById(userId);

        const accessToken = await this.jwtService.signAsync({
            sub: userId,
            email: user.email
        }, {
            secret: jwtConstants.JWT_ACCESS_SECRET,
            expiresIn: '15m'
        });

        const now = new Date();
        now.setDate(now.getDate() + 7);
        const tokenId = randomUUID();
        const refreshToken = await this.jwtService.signAsync({
            sub: userId,
            tokenId: tokenId
        }, {
            secret: jwtConstants.JWT_REFRESH_SECRET,
            expiresIn: now.getDate()
        });

        await this.updateRefreshToken(userId, tokenId, refreshToken, now);

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async updateRefreshToken(userId: string, tokenId: string, newRefreshToken: string, expiresIn: Date) {
        const refreshTokens = await this.refreshTokenModel.findOne<RefreshTokenModel>({
            where: {
                tokenId: tokenId
            }
        });
        const saltOrRounds = 10;
        const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, saltOrRounds);
        if (refreshTokens) {
            return this.refreshTokenModel.create<RefreshTokenModel>({
                tokenId: tokenId,
                userId: userId,
                token: hashedNewRefreshToken,
                expiresIn: expiresIn,
                parentToken: refreshTokens.token,
                tokenRank: refreshTokens.tokenRank + 1
            });
        } else {
            return this.refreshTokenModel.create<RefreshTokenModel>({
                tokenId: tokenId,
                userId: userId,
                token: hashedNewRefreshToken,
                expiresIn: expiresIn
            })
        }
    }

    async signIn(user: User) {
        return this.getTokens(user.id);
    }

    async validateRefreshToken(userId: string, tokenId: string, refreshToken: string) {
        const baseRefreshToken = await this.refreshTokenModel.findOne<RefreshTokenModel>({
            where: {
                tokenId: tokenId
            }
        });
        return bcrypt.compare(refreshToken, baseRefreshToken.token)
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

    async logOut(userId: string) {
        return this.refreshTokenModel.destroy({
            where: {
                userId: userId
            }
        })
    }
}
