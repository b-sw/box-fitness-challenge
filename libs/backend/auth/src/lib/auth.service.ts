import { CREATES_USER, CreatesUser, GETS_USERS, GetsUsers } from '@box-fc/backend/users';
import { Role, User, UserInfo, uuid } from '@box-fc/shared/types';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

type GoogleUser = {
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
};

@Injectable()
export class AuthService {
    private static readonly USER_NOT_FOUND_MESSAGE = 'User not found';
    private static readonly USER_INVALID_MESSAGE = 'User is invalid';
    private static readonly CHALLENGE_NOT_STARTED_MESSAGE = 'Challenge has not yet started';
    private static readonly GOOGLE_USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo';

    constructor(
        @Inject(GETS_USERS) private readonly getsUsers: GetsUsers,
        @Inject(CREATES_USER) private readonly createsUser: CreatesUser,
        private jwtService: JwtService,
    ) {}

    async googleLogin(googleToken: string): Promise<UserInfo> {
        const { data: googleUser }: { data: GoogleUser } = await axios.get(
            `${AuthService.GOOGLE_USER_INFO_ENDPOINT}?access_token=${googleToken}`,
            {
                baseURL: '',
                headers: { Authorization: `Bearer ${googleToken}`, Accept: 'application/json' },
            },
        );
        this._requireBoxEmail(googleUser.email);
        this._requireChallengeStarted(googleUser.email);

        const user =
            (await this.getsUsers.getUserByEmail(googleUser.email)) ??
            (await this._createUserFromGoogleData(googleUser));
        const jwt = this._getJwt(user.email, user.id);

        return { ...user, accessToken: jwt };
    }

    async devLogin(email: string): Promise<{ accessToken: string }> {
        const user = await this._getUser(email);
        const jwt = this._getJwt(user.email, user.id);
        return { accessToken: jwt };
    }

    private _createUserFromGoogleData(googleUser: GoogleUser): Promise<User> {
        return this.createsUser.createUser({
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            imageUrl: googleUser.picture,
            role: Role.Employee,
        });
    }

    private _requireBoxEmail(email: string): void {
        if (!email.endsWith('@box.com') && !this._isMeOrKuba(email) && email !== 'bartus.switalski@gmail.com') {
            throw new BadRequestException(AuthService.USER_INVALID_MESSAGE);
        }
    }

    private _requireChallengeStarted(email: string): void {
        const isChallengeStarted = dayjs().isBetween('2023-05-15', '2023-06-18');

        if (!isChallengeStarted && !this._isMeOrKuba(email)) {
            throw new BadRequestException(AuthService.CHALLENGE_NOT_STARTED_MESSAGE);
        }
    }

    private async _getUser(email: string): Promise<User> {
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

    // todo: remove later on
    private _isMeOrKuba(email: string): boolean {
        return (
            email === 'bswitalski.misc@gmail.com' ||
            email === 'bswitalski.main@gmail.com' ||
            email === 'bswitalski@box.com' ||
            email === 'jwincewicz@box.com'
        );
    }
}
