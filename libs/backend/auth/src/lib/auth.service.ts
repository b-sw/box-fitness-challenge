import { GETS_USERS, GetsUsers } from '@box-fc/backend/users';
import { User, UserCredentials, uuid } from '@box-fc/shared/types';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private static readonly USER_NOT_FOUND_MESSAGE = 'User not found';
    private static readonly USER_INVALID_MESSAGE = 'User is invalid';

    constructor(@Inject(GETS_USERS) private readonly getsUsers: GetsUsers, private jwtService: JwtService) {}

    async googleLogin(googleToken: string): Promise<UserCredentials> {
        const client = new OAuth2Client();
        const { email } = (await client.getTokenInfo(googleToken)) as { email: string };
        this._requireBoxEmail(email);
        const user = await this._getValidUser(email);
        const jwt = this._getJwt(email, user.id);

        return {
            id: user.id,
            accessToken: jwt,
            firstName: user.firstName,
            lastName: user.lastName,
            email: email,
            team: user.team,
            division: user.division,
            role: user.role,
        };
    }

    async devLogin(email: string): Promise<{ accessToken: string }> {
        const user = await this._getValidUser(email);
        const jwt = this._getJwt(user.email, user.id);
        return { accessToken: jwt };
    }

    private _requireBoxEmail(email: string): void {
        // todo: remove later on
        const isMeOrKuba = email === 'bswitalski.misc@gmail.com' || email === 'bswitalski.main@gmail.com';

        if (!email.endsWith('@box.com') && !isMeOrKuba) {
            throw new BadRequestException(AuthService.USER_INVALID_MESSAGE);
        }
    }

    private async _getValidUser(email: string): Promise<User> {
        const user = await this.getsUsers.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException(AuthService.USER_NOT_FOUND_MESSAGE);
        }

        return user;
    }

    private _getJwt(userEmail: string, userId: uuid): string {
        const payload = { email: userEmail, sub: userId };
        return this.jwtService.sign(payload);
    }
}
