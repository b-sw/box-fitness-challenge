import { Training, CreateTrainingDto } from '@box-fc/shared/types';

export interface CreatesTraining {
    createTraining(createTrainingDto: CreateTrainingDto): Promise<Training>;
}

export const CREATES_TRAINING = Symbol('CREATES_TRAINING');
