import { Role, User } from '@box-fc/shared/types';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@InjectRepository(User) protected usersRepository: Repository<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const admins: User[] = await this.usersRepository.find({ where: { role: Role.Admin } });

        if (admins.some((admin) => admin.id === request.user.id)) {
            return true;
        }

        throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
    }
}
