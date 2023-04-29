import { useAccumulatedActivitiesQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useEffect, useState } from 'react';
import { TeamsAccumulatedTableRaw } from './TeamsAccumulated.table.raw';

export const TeamsAccumulatedTable = () => {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));

    const { teamsActivitiesQuery } = useAccumulatedActivitiesQuery({ startDate, endDate });
    const { usersQuery } = useUsersQuery();

    const [usersMap, setUsersMap] = useState<{ [key: string]: User }>({});

    useEffect(() => {
        if (!teamsActivitiesQuery.data?.length || !usersQuery.data?.length) {
            return;
        }
        setUsersMap(usersQuery.data.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [teamsActivitiesQuery.data, usersQuery.data]);

    return <TeamsAccumulatedTableRaw activities={teamsActivitiesQuery.data ?? []} users={usersMap} />;
};
