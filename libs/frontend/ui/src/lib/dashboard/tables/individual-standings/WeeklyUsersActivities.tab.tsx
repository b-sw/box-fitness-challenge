import { DatesRange } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { User, UserActivity } from '@box-fc/shared/types';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { UserActivityListItem } from './UserActivity.list-item';

type Props = {
    filter: string;
    week: DatesRange;
    users: Map<User['id'], User>;
    selectActivity: (activity: UserActivity) => void;
    selectRange: (range: DatesRange) => void;
    showDetails: () => void;
    isMobile: boolean;
};

export const WeeklyUsersActivities = ({
    filter,
    week,
    users,
    selectActivity,
    selectRange,
    showDetails,
    isMobile,
}: Props) => {
    const [filteredActivities, setFilteredActivities] = useState<UserActivity[]>([]);
    const { usersActivities } = useActivitiesQuery({ ...week });

    useEffect(() => {
        const filteredActivities = getFilteredActivities();

        setFilteredActivities(filteredActivities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, usersActivities]);

    const getFilteredActivities = (): UserActivity[] => {
        return usersActivities.filter((userActivity) => {
            const { firstName, lastName, email, team } = users.get(userActivity.userId) as User;
            const searchedProps = [firstName, lastName, email, team];

            return searchedProps.some((value) => value?.toLowerCase().includes(filter.toLowerCase()));
        });
    };

    const showActivityDetails = (activity: UserActivity): void => {
        selectRange(week);
        selectActivity(activity);
        showDetails();
    };

    const getListItems = () => {
        return (
            <>
                {filteredActivities.map((userActivity) => (
                    <UserActivityListItem
                        key={`${userActivity.userId}`}
                        userActivity={userActivity}
                        user={users.get(userActivity.userId) as User}
                        onClick={showActivityDetails}
                        isMobile={isMobile}
                    />
                ))}
            </>
        );
    };

    return usersActivities?.length === 0 ? <NoRecords /> : getListItems();
};
