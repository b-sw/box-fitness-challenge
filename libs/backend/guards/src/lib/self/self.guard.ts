import { Activity, ActivityParams, User } from '@box-fc/shared/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminGuard } from '../admin/admin.guard';

@Injectable()
export class SelfGuard extends AdminGuard implements CanActivate {
    constructor(
        @InjectRepository(User) protected usersRepository: Repository<User>,
        @InjectRepository(Activity) protected activitiesRepository: Repository<Activity>,
    ) {
        super(usersRepository);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const params: ActivityParams = request.params;
        const activity = await this.activitiesRepository.findOne({ where: { id: params.activityId } });

        if (activity && activity.userId === request.user.id) {
            return true;
        }

        return super.canActivate(context);
    }
}
