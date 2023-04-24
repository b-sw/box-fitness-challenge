import { AccumulatedTeamActivity, AccumulatedUserActivity, Activity, Optional } from '@box-fc/shared/types';

type UserId = Activity['userId'];

export interface GetsActivities {
    getAllActivities(): Promise<Activity[]>;

    getActivityById(activityId: Activity['id']): Promise<Optional<Activity>>;

    getUserActivities(userId: UserId): Promise<Activity[]>;

    getAccumulatedUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<AccumulatedUserActivity>;

    getAccumulatedUsersActivities(startDate: Date, endDate: Date): Promise<AccumulatedUserActivity[]>;

    getAccumulatedTeamsActivities(startDate: Date, endDate: Date): Promise<AccumulatedTeamActivity[]>;
}

export const GETS_ACTIVITIES = Symbol('GETS_ACTIVITIES');
