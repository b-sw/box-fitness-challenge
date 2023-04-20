import { Activity, Optional, UpdateActivityDto } from '@box-fc/util-types';

export interface UpdatesActivity {
    updateActivity(activityId: Activity['id'], updateActivityDto: UpdateActivityDto): Promise<Optional<Activity>>;
}

export const UPDATES_ACTIVITY = Symbol('UPDATES_ACTIVITY');
