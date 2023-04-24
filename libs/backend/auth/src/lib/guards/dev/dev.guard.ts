import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDevDto } from '../../dto';

@Injectable()
export class DevGuard implements CanActivate {
    static readonly DEV_ENV = 'development';
    static readonly NOT_DEV_ENV_MESSAGE = 'Not dev env.';
    static readonly INVALID_DEV_AUTH_PASSWORD_MESSAGE = 'Invalid dev auth password.';

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const body: AuthDevDto = request.body;

        this._requireDevEnv();
        this._requireValidDevAuthPassword(body.devPassword);

        return true;
    }

    private _requireDevEnv(): void {
        const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === DevGuard.DEV_ENV;

        if (!isDevEnv) {
            throw new HttpException(DevGuard.NOT_DEV_ENV_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    private _requireValidDevAuthPassword(devPassword: string): void {
        const isValidDevAuthPassword = devPassword && devPassword === process.env.DEV_AUTH_PASSWORD;

        if (!isValidDevAuthPassword) {
            throw new HttpException(DevGuard.INVALID_DEV_AUTH_PASSWORD_MESSAGE, HttpStatus.FORBIDDEN);
        }
    }
}
