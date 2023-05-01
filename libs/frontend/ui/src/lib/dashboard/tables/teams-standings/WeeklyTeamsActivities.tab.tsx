import { Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { TeamActivityListItem } from './TeamActivity.list-item';

type Props = {
    filter: string;
    week: Week;
};

export const WeeklyTeamsActivitiesTab = ({ filter, week }: Props) => {
    const { teamsActivities } = useActivitiesQuery({ ...week });

    const getListItems = () => {
        return (
            <>
                {(teamsActivities || []).map((teamActivity) => (
                    <TeamActivityListItem teamActivity={teamActivity} />
                ))}
            </>
        );
    };

    return <>{teamsActivities?.length === 0 ? <NoRecords /> : getListItems()}</>;
};
