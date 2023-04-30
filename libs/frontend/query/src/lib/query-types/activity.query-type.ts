import { Training as TrainingEntity } from '@box-fc/shared/types';

export type Training = Omit<TrainingEntity, 'user'>;
