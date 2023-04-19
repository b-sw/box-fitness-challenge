import { GETS_USERS, UsersModule } from '@box-fc/data-access-users';
import { Activity } from '@box-fc/util-types';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivitiesController],
    providers: [
        ActivitiesService,
        {
            provide: GETS_USERS,
            useClass: UsersModule,
        },
    ],
    exports: [ActivitiesService],
})
export class ActivitiesModule {}
