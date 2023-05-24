import axios from 'axios';
import { useQuery } from 'react-query';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';
import { Training } from '../query-types';

export const useTrainingsQuery = () => {
    const TRAININGS_ENDPOINT = 'trainings';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAllTrainings = async (): Promise<Training[]> => {
        const response = await axios.get(TRAININGS_ENDPOINT);

        return response.data;
    };

    const trainingsQuery = useQuery<Training[]>([TRAININGS_QUERY_KEY], getAllTrainings, DEFAULT_QUERY_OPTIONS);

    return { trainingsQuery };
};
