import { DatesRange } from '@box-fc/frontend/domain';
import { useActivitiesQuery, useMobileQuery } from '@box-fc/frontend/query';
import { TeamActivity } from '@box-fc/shared/types';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { TeamActivityListItem } from './TeamActivity.list-item';

type Props = {
    filter: string;
    week: DatesRange;
};

export const WeeklyTeamsActivitiesTab = ({ filter, week }: Props) => {
    const [filteredActivities, setFilteredActivities] = useState<TeamActivity[]>([]);
    const { teamsActivities } = useActivitiesQuery({ ...week });
    const { isMobile } = useMobileQuery();

    useEffect(() => {
        const filteredActivities = getFilteredActivities();

        setFilteredActivities(filteredActivities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, teamsActivities]);

    const getFilteredActivities = (): TeamActivity[] => {
        return teamsActivities.filter((teamActivity) => teamActivity.team.toLowerCase().includes(filter.toLowerCase()));
    };

    const getListItems = () => {
        return (
            <>
                {filteredActivities.map((teamActivity) => (
                    <TeamActivityListItem
                        key={`${teamActivity.team}`}
                        teamActivity={teamActivity}
                        isMobile={isMobile}
                    />
                ))}
            </>
        );
    };

    return teamsActivities?.length === 0 ? <NoRecords /> : getListItems();
};
