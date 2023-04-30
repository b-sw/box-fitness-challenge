import { TeamActivity, UserActivity } from '@box-fc/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { TRAININGS_QUERY_KEY } from '../query-keys/trainings.query-key';

type AccumulatedActivitiesQueryProps = {
    startDate: Date;
    endDate: Date;
};

export const useActivitiesQuery = ({ startDate, endDate }: AccumulatedActivitiesQueryProps) => {
    // todo: move this to a shared file
    const TRAININGS_ENDPOINT = 'activities';
    const DEFAULT_QUERY_OPTIONS = { enabled: true, initialData: [] };

    const getAccumulatedTeamsActivities = async (): Promise<TeamActivity[]> => {
        const response = await axios.post(`${TRAININGS_ENDPOINT}/teams`, { startDate, endDate });

        return response.data;
    };

    const getAccumulatedUsersActivities = async (): Promise<UserActivity[]> => {
        const response = await axios.post(`${TRAININGS_ENDPOINT}/users`, { startDate, endDate });

        return response.data;
    };

    const teamsActivitiesQuery = useQuery<TeamActivity[]>(
        [TRAININGS_QUERY_KEY, 'teams'],
        getAccumulatedTeamsActivities,
        DEFAULT_QUERY_OPTIONS,
    );
    const usersActivitiesQuery = useQuery<UserActivity[]>(
        [TRAININGS_QUERY_KEY, 'users'],
        getAccumulatedUsersActivities,
        DEFAULT_QUERY_OPTIONS,
    );

    return {
        teamsActivities: teamsActivitiesQuery.data,
        teamsActivitiesStatus: teamsActivitiesQuery.status,
        usersActivities: usersActivitiesQuery.data,
        usersActivitiesStatus: usersActivitiesQuery.status,
    };
};
