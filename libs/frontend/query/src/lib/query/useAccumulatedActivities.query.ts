import { TeamActivity, UserActivity } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activity.query-key';

type AccumulatedActivitiesQueryProps = {
    startDate: Date;
    endDate: Date;
};

export const useAccumulatedActivitiesQuery = ({ startDate, endDate }: AccumulatedActivitiesQueryProps) => {
    const ACTIVITIES_ENDPOINT = 'activities';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAccumulatedTeamsActivities = async (): Promise<TeamActivity[]> => {
        const response = await axios.post(`${ACTIVITIES_ENDPOINT}/accumulated/teams`, { startDate, endDate });

        return response.data;
    };

    const getAccumulatedUsersActivities = async (): Promise<UserActivity[]> => {
        const response = await axios.post(`${ACTIVITIES_ENDPOINT}/accumulated/users`, { startDate, endDate });

        return response.data;
    };

    const teamsActivitiesQuery = useQuery<TeamActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'teams-accumulated'],
        getAccumulatedTeamsActivities,
        DEFAULT_QUERY_OPTIONS,
    );
    const accumulatedActivitiesQuery = useQuery<UserActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'users-accumulated'],
        getAccumulatedUsersActivities,
        DEFAULT_QUERY_OPTIONS,
    );

    return { teamsActivitiesQuery, accumulatedActivitiesQuery };
};
