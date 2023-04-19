import { Activity, CreateActivityDto } from '@box-fc/util-types';

export interface CreatesActivity {
    createActivity(createActivityDto: CreateActivityDto): Promise<Activity>;
}

export const CREATES_ACTIVITY = Symbol('CREATES_ACTIVITY');
