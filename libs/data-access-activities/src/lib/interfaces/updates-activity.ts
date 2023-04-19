import { Activity, UpdateActivityDto } from '@box-fc/util-types';

export interface UpdatesActivity {
    updateActivity(activityId: Activity['id'], updateActivityDto: UpdateActivityDto): Promise<Activity | null>;
}

export const UPDATES_ACTIVITY = Symbol('UPDATES_ACTIVITY');
