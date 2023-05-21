import { Week } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useWeeksQuery = () => {
    const WEEKS_ENDPOINT = 'weeks';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getWeeks = async (): Promise<Week[]> => {
        const response = await axios.get(WEEKS_ENDPOINT);

        return response.data;
    };

    const weeksQuery = useQuery<Week[]>(WEEKS_ENDPOINT, getWeeks, DEFAULT_QUERY_OPTIONS);

    return { weeks: weeksQuery.data, isLoading: weeksQuery.isLoading };
};
