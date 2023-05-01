import { CreateTrainingDto, Training, UpdateTrainingDto } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';

export const useTrainingMutation = () => {
    const TRAININGS_ENDPOINT = 'trainings';
    const queryClient = useQueryClient();

    const createTraining = async (dto: CreateTrainingDto): Promise<Training> => {
        console.log('dto', dto);
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
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [TRAININGS_QUERY_KEY] });
        },
    });

    const updateMutation = useMutation(updateTraining, {
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [TRAININGS_QUERY_KEY] });
        },
    });

    const deleteMutation = useMutation(deleteTraining, {
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [TRAININGS_QUERY_KEY] });
        },
    });

    return { createMutation, updateMutation, deleteMutation };
};
