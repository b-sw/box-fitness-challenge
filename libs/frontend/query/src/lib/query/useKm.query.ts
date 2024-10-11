import axios from 'axios';
import { useQuery } from 'react-query';
import { KM_QUERY_KEY } from '../query-keys/km.query-key';

export const useKmQuery = () => {
    const KM_ENDPOINT = 'totalKm';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: 123 };

    const getTotalKm = async (): Promise<number> => {
        const response = await axios.get(KM_ENDPOINT);

        return response.data;
    };

    const kmQuery = useQuery<number>([KM_QUERY_KEY], getTotalKm, DEFAULT_QUERY_OPTIONS);

    return { kmQuery };
};
