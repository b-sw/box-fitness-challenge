import { Activity } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activity.query-key';

export const useActivitiesQuery = () => {
    const ACTIVITIES_ENDPOINT = 'activities';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAllActivities = async (): Promise<Activity[]> => {
        const response = await axios.get(ACTIVITIES_ENDPOINT);

        return response.data;
    };

    const activitiesQuery = useQuery<Activity[]>([ACTIVITIES_QUERY_KEY], getAllActivities, DEFAULT_QUERY_OPTIONS);

    return { activitiesQuery };
};
