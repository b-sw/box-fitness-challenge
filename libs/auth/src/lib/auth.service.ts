import { UsersService } from '@box-fc/data-access-users';
import { User, UserCredentials, uuid } from '@box-fc/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private static readonly USER_NOT_FOUND_MESSAGE = 'User not found';

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async googleLogin(googleToken: string): Promise<UserCredentials> {
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
        });
        const { email } = ticket.getPayload() as { email: string };
        const user = await this._getValidUser(email);
        const jwt = this._getJwt(email, user.id);

        return {
            id: user.id,
            accessToken: jwt,
            firstName: user.firstName,
            lastName: user.lastName,
            email: email,
        };
    }

    async devLogin(email: string): Promise<{ accessToken: string }> {
        const user = await this._getValidUser(email);
        const jwt = this._getJwt(user.email, user.id);
        return { accessToken: jwt };
    }

    private async _getValidUser(email: string): Promise<User> {
        const user = await this.usersService.getByEmail(email);

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
