import { UserInfo } from '@box-fc/shared/types';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDevDto, AuthDto } from './dto';
import { DevGuard } from './guards/dev/dev.guard';

@ApiTags(AuthController.AUTH_API_TAG)
@Controller('')
export class AuthController {
    private static readonly AUTH_API_TAG = 'auth';

    constructor(private readonly authService: AuthService) {}

    @Post('google/auth')
    async authenticateUser(@Body() authDto: AuthDto): Promise<UserInfo> {
        return this.authService.googleLogin(authDto.googleToken);
    }

    @Post('dev/auth')
    @UseGuards(DevGuard)
    async authenticateUserDev(@Body() authDto: AuthDevDto): Promise<{ accessToken: string }> {
        return this.authService.devLogin(authDto.email);
    }
}
