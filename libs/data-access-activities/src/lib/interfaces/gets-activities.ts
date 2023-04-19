import { Activity, User } from '@box-fc/util-types';

type UserId = Activity['userId'];
type Team = User['team'];
export type AccumulatedUserActivity = { userId: UserId; activeTime: number; activitiesCount: number };
export type AccumulatedTeamActivity = { team: Team; activeTime: number; activitiesCount: number };

export interface GetsActivities {
    getAllActivities(): Promise<Activity[]>;

    getActivityById(activityId: Activity['id']): Promise<Activity | null>;

    getUserActivities(userId: UserId): Promise<Activity[]>;

    getAccumulatedUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<AccumulatedUserActivity>;

    getAccumulatedUsersActivities(startDate: Date, endDate: Date): Promise<AccumulatedUserActivity[]>;

    getAccumulatedTeamsActivities(startDate: Date, endDate: Date): Promise<AccumulatedTeamActivity[]>;
}

export const GETS_ACTIVITIES = Symbol('GETS_ACTIVITIES');
