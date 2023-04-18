import { Role, User } from '@box-fc/types';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(protected usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const admins: User[] = await this.usersService.getByRole(Role.Admin);

        if (admins.some((admin) => admin.id === request.user.id)) {
            return true;
        }

        throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
    }
}
