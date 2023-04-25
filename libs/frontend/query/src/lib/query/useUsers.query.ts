import { User } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { USERS_QUERY_KEY } from '../query-keys/users.query-key';

export const useUsersQuery = () => {
    const USERS_ENDPOINT = 'users';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAllUsers = async (): Promise<User[]> => {
        const response = await axios.get(USERS_ENDPOINT);

        return response.data;
    };

    const usersQuery = useQuery<User[]>([USERS_QUERY_KEY], getAllUsers, DEFAULT_QUERY_OPTIONS);

    return { usersQuery };
};
