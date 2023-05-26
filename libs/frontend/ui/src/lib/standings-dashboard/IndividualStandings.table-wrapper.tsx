import { Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery, useUsersQuery } from '@box-fc/frontend/query';
import { IndividualStandingsTable } from './IndividualStandings.table';

type Props = {
    week: Week;
};

export const IndividualStandingsTableWrapper = ({ week }: Props) => {
    const { users } = useUsersQuery();
    const { usersActivities, usersActivitiesAreLoading } = useActivitiesQuery({ ...week });

    if (usersActivitiesAreLoading) {
        return null;
    }

    return <IndividualStandingsTable users={users} usersActivities={usersActivities} />;
};
