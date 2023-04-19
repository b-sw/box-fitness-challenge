import { Activity } from '@box-fc/util-types';

export interface DeletesActivity {
    deleteActivity(activityId: Activity['id']): Promise<Activity | null>;
}

export const DELETES_ACTIVITY = Symbol('DELETES_ACTIVITY');
