import {
    AccumulatedTeamActivity,
    AccumulatedUserActivity,
    Activity,
    CreateActivityDto,
    Optional,
    UpdateActivityDto,
    User,
} from '@box-fc/util-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatesActivity, DeletesActivity, GetsActivities, UpdatesActivity } from './interfaces';

type ActivityId = Activity['id'];
type UserId = Activity['userId'];
type Team = User['team'];

@Injectable()
export class ActivitiesService implements CreatesActivity, GetsActivities, UpdatesActivity, DeletesActivity {
    constructor(
        @InjectRepository(Activity) private activityRepository: Repository<Activity>,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
        const sportActivity = this.activityRepository.create(createActivityDto);

        return this.activityRepository.save(sportActivity);
    }

    getAllActivities(): Promise<Activity[]> {
        return this.activityRepository.find();
    }

    getActivityById(activityId: ActivityId): Promise<Optional<Activity>> {
        return this.activityRepository.findOne({ where: { id: activityId } });
    }

    getUserActivities(userId: UserId): Promise<Activity[]> {
        return this.activityRepository.find({ where: { userId: userId } });
    }

    async getAccumulatedUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<AccumulatedUserActivity> {
        const activities = await this.activityRepository.find({
            where: { userId: userId, trainingDate: Between(startDate, endDate) },
        });
        const activeTime = activities.reduce((acc, { duration }) => acc + duration, 0);
        const activitiesCount = activities.length;

        return { userId, activeTime, activitiesCount };
    }

    async getAccumulatedUsersActivities(startDate: Date, endDate: Date): Promise<AccumulatedUserActivity[]> {
        const activities = await this._getActivitiesInDateRange(startDate, endDate);
        const accumulatedUsersActivity = activities.reduce((acc, { userId, duration }) => {
            acc.set(userId, {
                userId,
                activeTime: (acc.get(userId)?.activeTime ?? 0) + duration,
                activitiesCount: (acc.get(userId)?.activitiesCount ?? 0) + 1,
            });

            return acc;
        }, new Map<UserId, AccumulatedUserActivity>());

        return Array.from(accumulatedUsersActivity.values());
    }

    async getAccumulatedTeamsActivities(startDate: Date, endDate: Date): Promise<AccumulatedTeamActivity[]> {
        const activities = await this._getActivitiesInDateRange(startDate, endDate);
        const users = await this.usersRepository.find();
        const usersTeams = new Map(users.map(({ id, team }) => [id, team]));
        const accumulatedTeamsActivities = activities.reduce((acc, { userId, duration }) => {
            const team = usersTeams.get(userId) as Team;

            acc.set(team, {
                team,
                activeTime: (acc.get(team)?.activeTime ?? 0) + duration,
                activitiesCount: (acc.get(team)?.activitiesCount ?? 0) + 1,
            });

            return acc;
        }, new Map<Team, AccumulatedTeamActivity>());

        return Array.from(accumulatedTeamsActivities.values());
    }

    async updateActivity(activityId: ActivityId, updateActivityDto: UpdateActivityDto): Promise<Optional<Activity>> {
        await this.activityRepository.update(activityId, updateActivityDto);

        return await this.getActivityById(activityId);
    }

    async deleteActivity(activityId: ActivityId): Promise<Optional<Activity>> {
        const sportActivity = await this.getActivityById(activityId);

        await this.activityRepository.delete(activityId);

        return sportActivity;
    }

    private _getActivitiesInDateRange(startDate: Date, endDate: Date): Promise<Activity[]> {
        return this.activityRepository.find({ where: { trainingDate: Between(startDate, endDate) } });
    }
}
