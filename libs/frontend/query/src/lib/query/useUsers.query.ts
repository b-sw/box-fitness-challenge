import { User } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { USERS_QUERY_KEY } from '../query-keys/users.query-key';

export const useUsersQuery = () => {
    const USERS_ENDPOINT = 'users';
    const DEFAULT_QUERY_OPTIONS = { enabled: true };

    const getAllUsers = async (): Promise<Map<User['id'], User>> => {
        const response = await axios.get(USERS_ENDPOINT);
        const users: User[] = response.data;

        return users.reduce((map, user) => {
            map.set(user.id, user);
            return map;
        }, new Map<User['id'], User>());
    };

    const usersQuery = useQuery<Map<User['id'], User>>([USERS_QUERY_KEY], getAllUsers, DEFAULT_QUERY_OPTIONS);

    return {
        users: usersQuery.data,
        usersAreLoading: usersQuery.isLoading,
    } as { users: Map<User['id'], User>; usersAreLoading: boolean };
};
