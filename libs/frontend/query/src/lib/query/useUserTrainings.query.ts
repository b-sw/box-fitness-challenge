import { User } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';
import { Training } from '../query-types/training.query-type';

type Props = {
    userId: User['id'];
};

export const useUserTrainingsQuery = ({ userId }: Props) => {
    const TRAININGS_ENDPOINT = 'trainings';
    // todo: not enabled: false
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getUserTrainings = async (): Promise<Training[]> => {
        const response = await axios.get(`${TRAININGS_ENDPOINT}/users/${userId}`);

        return response.data;
    };

    const userTrainingsQuery = useQuery<Training[]>(
        [TRAININGS_QUERY_KEY, userId],
        getUserTrainings,
        DEFAULT_QUERY_OPTIONS,
    );

    return { userTrainings: userTrainingsQuery.data, isLoading: userTrainingsQuery.isLoading } as {
        userTrainings: Training[];
        isLoading: boolean;
    };
};
