import { Training, User } from '@box-fc/shared/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminGuard } from '../admin/admin.guard';

@Injectable()
export class SelfGuard extends AdminGuard implements CanActivate {
    constructor(
        @InjectRepository(User) protected usersRepository: Repository<User>,
        @InjectRepository(Training) protected activitiesRepository: Repository<Training>,
    ) {
        super(usersRepository);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.user.id === request.body.userId) {
            return true;
        }

        return super.canActivate(context);
    }
}
