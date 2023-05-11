import { CREATES_USER, GETS_USERS, UsersService } from '@box-fc/backend/users';
import { User } from '@box-fc/shared/types';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
    imports: [JwtModule.register(AuthModule.JWT_OPTIONS), TypeOrmModule.forFeature([User])],
    providers: [
        JwtStrategy,
        {
            provide: GETS_USERS,
            useClass: UsersService,
        },
        {
            provide: CREATES_USER,
            useClass: UsersService,
        },
        AuthService,
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
