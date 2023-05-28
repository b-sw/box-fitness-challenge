import { Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { TeamsStandingsTable } from './TeamsStandings.table';

type Props = {
    week: Week;
};

export const TeamsStandingsTableWrapper = ({ week }: Props) => {
    const { teamsActivities, teamsActivitiesAreLoading } = useActivitiesQuery({ ...week });

    if (teamsActivitiesAreLoading) {
        return null;
    }

    return <TeamsStandingsTable teamsActivities={teamsActivities} />;
};
