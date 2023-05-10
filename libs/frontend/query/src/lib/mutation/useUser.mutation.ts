import { UpdateUserDto, User } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activities.query-key';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';
import { USERS_QUERY_KEY } from '../query-keys/users.query-key';

export const useUserMutation = () => {
    const USERS_ENDPOINT = 'users';
    const queryClient = useQueryClient();

    const invalidateQueries = async () => {
        [USERS_QUERY_KEY, ACTIVITIES_QUERY_KEY, TRAININGS_QUERY_KEY].map(
            async (key) => await queryClient.invalidateQueries({ queryKey: [key] }),
        );
    };

    const updateUser = async (args: { userId: string; dto: UpdateUserDto }): Promise<User> => {
        const response = await axios.put(`${USERS_ENDPOINT}/${args.userId}`, args.dto);

        return response.data;
    };

    const updateMutation = useMutation(updateUser, {
        onSuccess: async (_) => await invalidateQueries(),
    });

    return { updateMutation };
};
