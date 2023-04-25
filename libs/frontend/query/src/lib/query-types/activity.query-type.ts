import { Activity } from '@box-fc/shared/types';

export type ActivityQueryType = Omit<Activity, 'user'>;
