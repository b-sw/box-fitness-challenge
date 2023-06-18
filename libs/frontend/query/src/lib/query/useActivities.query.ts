import { TeamActivity, UserActivity } from '@box-fc/shared/types';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { useQuery } from 'react-query';
import { ACTIVITIES_QUERY_KEY } from '../query-keys/activities.query-key';

type Props = {
    startDate: Dayjs;
    endDate: Dayjs;
};

export const useActivitiesQuery = ({ startDate, endDate }: Props) => {
    // todo: move this to a shared file
    const TRAININGS_ENDPOINT = 'activities';
    const DEFAULT_QUERY_OPTIONS = { enabled: true };

    const getAccumulatedTeamsActivities = async (): Promise<TeamActivity[]> => {
        const response = await axios.post(`${TRAININGS_ENDPOINT}/teams`, { startDate, endDate });

        return response.data;
    };

    const getAccumulatedUsersActivities = async (): Promise<UserActivity[]> => {
        const response = await axios.post(`${TRAININGS_ENDPOINT}/users`, { startDate, endDate });

        return response.data;
    };

    const teamsActivitiesQuery = useQuery<TeamActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'teams', startDate.toISOString(), endDate.toISOString()],
        getAccumulatedTeamsActivities,
        DEFAULT_QUERY_OPTIONS,
    );
    const usersActivitiesQuery = useQuery<UserActivity[]>(
        [ACTIVITIES_QUERY_KEY, 'users', startDate.toISOString(), endDate.toISOString()],
        getAccumulatedUsersActivities,
        DEFAULT_QUERY_OPTIONS,
    );

    return {
        teamsActivities: teamsActivitiesQuery.data || ([] as TeamActivity[]),
        teamsActivitiesAreLoading: teamsActivitiesQuery.isLoading,
        usersActivities: usersActivitiesQuery.data || ([] as UserActivity[]),
        usersActivitiesAreLoading: usersActivitiesQuery.isLoading,
    };
};
