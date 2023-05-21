import { Winner } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { WINNERS_QUERY_KEY } from '../query-keys/winners.query-key';

export const useWinnersQuery = () => {
    const WINNERS_ENDPOINT = 'winners';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAllWinners = async (): Promise<Winner[]> => {
        const response = await axios.get(WINNERS_ENDPOINT);

        return response.data;
    };

    const winnersQuery = useQuery<Winner[]>(WINNERS_QUERY_KEY, getAllWinners, DEFAULT_QUERY_OPTIONS);

    return { winnersQuery };
};
