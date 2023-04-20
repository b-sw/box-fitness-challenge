import { Activity, Optional } from '@box-fc/util-types';

export interface DeletesActivity {
    deleteActivity(activityId: Activity['id']): Promise<Optional<Activity>>;
}

export const DELETES_ACTIVITY = Symbol('DELETES_ACTIVITY');
