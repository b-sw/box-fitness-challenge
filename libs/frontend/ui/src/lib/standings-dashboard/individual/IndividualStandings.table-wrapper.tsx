import { Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery, useUsersQuery } from '@box-fc/frontend/query';
import { UserActivity } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { IndividualStandingsTable } from './IndividualStandings.table';
import { UserActivityModal } from './UserActivity.modal';

type Props = {
    week: Week;
};

export const IndividualStandingsTableWrapper = ({ week }: Props) => {
    const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
    const { usersActivities, usersActivitiesAreLoading } = useActivitiesQuery({ ...week });
    const { users } = useUsersQuery();

    const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(null);

    const handleActivityClicked = (activity: UserActivity) => {
        setSelectedActivity(activity);
        onDetailsOpen();
    };

    if (usersActivitiesAreLoading) {
        return null;
    }

    return (
        <>
            {isDetailsOpen && (
                <UserActivityModal
                    onClose={onDetailsClose}
                    isOpen={isDetailsOpen}
                    activity={selectedActivity as UserActivity}
                    range={week}
                />
            )}
            <IndividualStandingsTable
                users={users}
                usersActivities={usersActivities}
                handleActivityClicked={handleActivityClicked}
            />
        </>
    );
};
