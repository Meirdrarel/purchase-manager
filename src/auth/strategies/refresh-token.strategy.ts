import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "../auth.module";
import {Request} from "express";
import {AuthService} from "../auth.service";

export type RefreshPayload = {
    sub: string;
    tokenId: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor(protected authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.JWT_REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: RefreshPayload) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        const validated = await this.authService.validateRefreshToken(payload.sub, payload.tokenId, refreshToken);
        if (!validated) {
            throw new UnauthorizedException();
        } else {
            return payload;
        }
    }
}