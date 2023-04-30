import { Training, CreateTrainingDto, UpdateTrainingDto } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activity.query-key';

export const useActivityMutation = () => {
    const ACTIVITIES_ENDPOINT = 'activities';
    const queryClient = useQueryClient();

    const createActivity = async (dto: CreateTrainingDto): Promise<Training> => {
        const response = await axios.post(ACTIVITIES_ENDPOINT, dto);

        return response.data;
    };

    const updateActivity = async (args: { activityId: string; dto: UpdateTrainingDto }): Promise<Training> => {
        const response = await axios.post(`${ACTIVITIES_ENDPOINT}/${args.activityId}`, args.dto);

        return response.data;
    };

    const deleteActivity = async (activityId: string): Promise<Training> => {
        const response = await axios.delete(`${ACTIVITIES_ENDPOINT}/${activityId}`);

        return response.data;
    };

    const createMutation = useMutation(createActivity, {
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
    });

    const updateMutation = useMutation(updateActivity, {
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
    });

    const deleteMutation = useMutation(deleteActivity, {
        onSuccess: async (_: Training) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
    });

    return { createMutation, updateMutation, deleteMutation };
};
