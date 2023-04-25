import { useActivitiesQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useEffect, useState } from 'react';
import { PersonalDetailedTableRaw } from './PersonalDetailed.table.raw';

export const PersonalDetailedTable = () => {
    const { activitiesQuery } = useActivitiesQuery();
    const { usersQuery } = useUsersQuery();
    const [usersMap, setUsersMap] = useState<{ [key: string]: User }>({});

    useEffect(() => {
        if (!activitiesQuery.data?.length || !usersQuery.data?.length) {
            return;
        }
        setUsersMap(usersQuery.data.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [activitiesQuery.data, usersQuery.data]);

    return <PersonalDetailedTableRaw activities={activitiesQuery.data ?? []} users={usersMap} />;
};
