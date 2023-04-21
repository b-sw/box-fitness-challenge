import { Activity, CreateActivityDto, UpdateActivityDto } from '@box-fc/util-types';
import { toastError } from '@box-fc/util-ui';
import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys';

export const useActivityMutation = () => {
    const ACTIVITIES_ENDPOINT = 'activities';

    const toast = useToast();
    const queryClient = useQueryClient();

    const createActivity = async (dto: CreateActivityDto): Promise<Activity> => {
        const response = await axios.post(ACTIVITIES_ENDPOINT, dto);

        return response.data;
    };

    const updateActivity = async (args: { activityId: string; dto: UpdateActivityDto }): Promise<Activity> => {
        const response = await axios.post(`${ACTIVITIES_ENDPOINT}/${args.activityId}`, args.dto);

        return response.data;
    };

    const deleteActivity = async (activityId: string): Promise<Activity> => {
        const response = await axios.delete(`${ACTIVITIES_ENDPOINT}/${activityId}`);

        return response.data;
    };

    const createMutation = useMutation(createActivity, {
        onSuccess: async (_: Activity) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const updateMutation = useMutation(updateActivity, {
        onSuccess: async (_: Activity) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const deleteMutation = useMutation(deleteActivity, {
        onSuccess: async (_: Activity) => {
            await queryClient.invalidateQueries({ queryKey: [ACTIVITIES_QUERY_KEY] });
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    return { createMutation, updateMutation, deleteMutation };
};
