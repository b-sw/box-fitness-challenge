import { GETS_USERS, UsersService } from '@box-fc/data-access-users';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
    imports: [JwtModule.register(AuthModule.JWT_OPTIONS)],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: GETS_USERS,
            useClass: UsersService,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    private static readonly JWT_EXPIRATION_TIME = '30m';
    private static readonly JWT_OPTIONS = {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: AuthModule.JWT_EXPIRATION_TIME },
    };
}
