import { Training, Optional } from '@box-fc/shared/types';

export interface DeletesTraining {
    deleteTraining(activityId: Training['id']): Promise<Optional<Training>>;
}

export const DELETES_ACTIVITY = Symbol('DELETES_ACTIVITY');
