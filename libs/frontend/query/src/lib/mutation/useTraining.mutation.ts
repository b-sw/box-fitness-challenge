import { CreateTrainingDto, Training, UpdateTrainingDto } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activities.query-key';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';

export const useTrainingMutation = () => {
    const TRAININGS_ENDPOINT = 'trainings';
    const queryClient = useQueryClient();

    const invalidateQueries = async () => {
        [TRAININGS_QUERY_KEY, ACTIVITIES_QUERY_KEY].map(
            async (key) => await queryClient.invalidateQueries({ queryKey: [key] }),
        );
    };

    const createTraining = async (dto: CreateTrainingDto): Promise<Training> => {
        const response = await axios.post(TRAININGS_ENDPOINT, dto);

        return response.data;
    };

    const updateTraining = async (args: { trainingId: string; dto: UpdateTrainingDto }): Promise<Training> => {
        const response = await axios.post(`${TRAININGS_ENDPOINT}/${args.trainingId}`, args.dto);

        return response.data;
    };

    const deleteTraining = async (trainingId: string): Promise<Training> => {
        const response = await axios.delete(`${TRAININGS_ENDPOINT}/${trainingId}`);

        return response.data;
    };

    const createMutation = useMutation(createTraining, {
        onSuccess: async (_: Training) => await invalidateQueries(),
    });

    const updateMutation = useMutation(updateTraining, {
        onSuccess: async (_: Training) => await invalidateQueries(),
    });

    const deleteMutation = useMutation(deleteTraining, {
        onSuccess: async (_: Training) => await invalidateQueries(),
    });

    return { createMutation, updateMutation, deleteMutation };
};
