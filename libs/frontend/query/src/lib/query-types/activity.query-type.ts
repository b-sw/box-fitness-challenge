import { Activity as ActivityEntity } from '@box-fc/shared/types';

export type Activity = Omit<ActivityEntity, 'user'>;
