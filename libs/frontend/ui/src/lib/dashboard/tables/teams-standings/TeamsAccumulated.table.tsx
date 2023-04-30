import { useActivitiesQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useEffect, useState } from 'react';
import { TeamsAccumulatedTableRaw } from './TeamsAccumulated.table.raw';

export const TeamsAccumulatedTable = () => {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 30));

    const { teamsActivities } = useActivitiesQuery({ startDate, endDate });
    const { users } = useUsersQuery();

    const [mappedUsers, setMappedUsers] = useState<{ [key: string]: User }>({});

    useEffect(() => {
        if (!teamsActivities?.length || !users?.length) {
            return;
        }
        setMappedUsers(users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [teamsActivities, users]);

    return <TeamsAccumulatedTableRaw activities={teamsActivities ?? []} users={mappedUsers} />;
};
