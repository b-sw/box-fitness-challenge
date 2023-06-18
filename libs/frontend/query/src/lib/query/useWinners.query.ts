import { Winner } from '@box-fc/shared/types';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { useQuery } from 'react-query';
import { WINNERS_QUERY_KEY } from '../query-keys/winners.query-key';

type Props = {
    date: Dayjs;
};

export const useWinnersQuery = ({ date }: Props) => {
    // todo: move this to a shared file
    const WINNERS_ENDPOINT = 'winners';
    const DEFAULT_QUERY_OPTIONS = { enabled: true };

    const getWinners = async (): Promise<Winner[]> => {
        const response = await axios.post(`${WINNERS_ENDPOINT}/date`, { date });

        return response.data;
    };

    const winnersQuery = useQuery<Winner[]>([WINNERS_QUERY_KEY, date.toISOString()], getWinners, DEFAULT_QUERY_OPTIONS);

    return {
        winners: winnersQuery.data || ([] as Winner[]),
        isLoading: winnersQuery.isLoading,
    };
};
