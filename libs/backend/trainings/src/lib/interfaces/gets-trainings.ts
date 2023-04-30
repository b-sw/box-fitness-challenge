import { TeamActivity, UserActivity, Training, Optional } from '@box-fc/shared/types';

type UserId = Training['userId'];

export interface GetsTrainings {
    getAllTrainings(): Promise<Training[]>;

    getTrainingById(activityId: Training['id']): Promise<Optional<Training>>;

    getUserTrainings(userId: UserId): Promise<Training[]>;

    getUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<UserActivity>;

    getAllUsersActivities(startDate: Date, endDate: Date): Promise<UserActivity[]>;

    getAllTeamsActivities(startDate: Date, endDate: Date): Promise<TeamActivity[]>;
}

export const GETS_TRAININGS = Symbol('GETS_TRAININGS');
