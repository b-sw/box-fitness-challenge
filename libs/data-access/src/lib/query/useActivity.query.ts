import { AccumulatedTeamActivity, AccumulatedUserActivity, Activity } from '@box-fc/util-types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys';

export const useActivityQuery = () => {
    const ACTIVITIES_ENDPOINT = 'activities';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, placeholderData: [] };

    const getAllActivities = async (): Promise<Activity[]> => {
        const response = await axios.get(ACTIVITIES_ENDPOINT);

        return response.data;
    };

    const getAccumulatedTeamsActivities = async (): Promise<AccumulatedTeamActivity[]> => {
        const response = await axios.get(`${ACTIVITIES_ENDPOINT}/teams`);

        return response.data;
    };

    const getAccumulatedUsersActivities = async (): Promise<AccumulatedUserActivity[]> => {
        const response = await axios.get(`${ACTIVITIES_ENDPOINT}/users`);

        return response.data;
    };

    const activitiesQuery = useQuery<Activity[]>([ACTIVITIES_QUERY_KEY], getAllActivities, DEFAULT_QUERY_OPTIONS);
    const teamsActivitiesQuery = useQuery<AccumulatedTeamActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'teams-accumulated'],
        getAccumulatedTeamsActivities,
        DEFAULT_QUERY_OPTIONS,
    );
    const accumulatedActivitiesQuery = useQuery<AccumulatedUserActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'users-accumulated'],
        getAccumulatedUsersActivities,
        DEFAULT_QUERY_OPTIONS,
    );

    return { activitiesQuery, teamsActivitiesQuery, accumulatedActivitiesQuery };
};
