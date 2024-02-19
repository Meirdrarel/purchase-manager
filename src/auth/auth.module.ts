import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {AccessTokenStrategy} from "./strategies/access-token.strategy";
import {RefreshTokenStrategy} from "./strategies/refresh-token.strategy";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/user.model";
import {RefreshTokenModel} from "./refresh-token.model";

export const jwtConstants = {
    JWT_ACCESS_SECRET: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    JWT_REFRESH_SECRET: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.'
};

@Module({
    imports: [
        SequelizeModule.forFeature([RefreshTokenModel]),
        UsersModule,
        PassportModule,
        JwtModule.register({}),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        AccessTokenStrategy,
        RefreshTokenStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
