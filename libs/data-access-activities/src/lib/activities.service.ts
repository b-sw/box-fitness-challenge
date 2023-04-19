import { GETS_USERS, GetsUsers } from '@box-fc/data-access-users';
import { Activity, CreateActivityDto, UpdateActivityDto, User } from '@box-fc/util-types';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreatesActivity,
    DeletesActivity,
    GetsActivities,
    UpdatesActivity,
} from 'libs/data-access-activities/src/lib/interfaces';
import { Between, Repository } from 'typeorm';

type ActivityId = Activity['id'];
type UserId = Activity['userId'];
type Team = User['team'];
type AccumulatedUserActivity = { userId: UserId; activeTime: number; activitiesCount: number };
type AccumulatedTeamActivity = { team: Team; activeTime: number; activitiesCount: number };

@Injectable()
export class ActivitiesService implements CreatesActivity, GetsActivities, UpdatesActivity, DeletesActivity {
    constructor(
        @Inject(GETS_USERS) private readonly getsUsers: GetsUsers,
        @InjectRepository(Activity) private sportActivityRepository: Repository<Activity>,
    ) {}

    createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
        const sportActivity = this.sportActivityRepository.create(createActivityDto);

        return this.sportActivityRepository.save(sportActivity);
    }

    getAllActivities(): Promise<Activity[]> {
        return this.sportActivityRepository.find();
    }

    getActivityById(activityId: ActivityId): Promise<Activity | null> {
        return this.sportActivityRepository.findOne({ where: { id: activityId } });
    }

    getUserActivities(userId: UserId): Promise<Activity[]> {
        return this.sportActivityRepository.find({ where: { userId: userId } });
    }

    async getAccumulatedUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<AccumulatedUserActivity> {
        const activities = await this.sportActivityRepository.find({
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
        const users = await this.getsUsers.getAllUsers();
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

    async updateActivity(activityId: ActivityId, updateActivityDto: UpdateActivityDto): Promise<Activity | null> {
        await this.sportActivityRepository.update(activityId, updateActivityDto);

        return await this.getActivityById(activityId);
    }

    async deleteActivity(activityId: ActivityId): Promise<Activity | null> {
        const sportActivity = await this.getActivityById(activityId);

        await this.sportActivityRepository.delete(activityId);

        return sportActivity;
    }

    private _getActivitiesInDateRange(startDate: Date, endDate: Date): Promise<Activity[]> {
        return this.sportActivityRepository.find({ where: { trainingDate: Between(startDate, endDate) } });
    }
}
