import { Training, Optional, UpdateTrainingDto } from '@box-fc/shared/types';

export interface UpdatesTraining {
    updateTraining(trainingId: Training['id'], updateTrainingDto: UpdateTrainingDto): Promise<Optional<Training>>;
}

export const UPDATES_TRAINING = Symbol('UPDATES_TRAINING');
