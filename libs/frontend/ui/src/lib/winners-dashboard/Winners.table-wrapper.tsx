import { Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery, useAuthQuery, useUsersQuery, useWinnersQuery } from '@box-fc/frontend/query';
import { PodiumPlace, User, UserActivity } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { AddWinnerModal } from './AddWinner.modal';
import { WinnersTable } from './Winners.table';

type Props = {
    week: Week;
};

export const WinnersTableWrapper = ({ week }: Props) => {
    const { users } = useUsersQuery();
    const { isAdmin } = useAuthQuery();
    const { usersActivities } = useActivitiesQuery(week);
    const { winners, isLoading } = useWinnersQuery({ date: week.endDate });

    const [selectedPodiumPlace, setSelectedPodiumPlace] = useState<PodiumPlace | undefined>(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClicked = (podiumPlace: PodiumPlace) => {
        setSelectedPodiumPlace(podiumPlace);
        onOpen();
    };

    return (
        <>
            {isOpen && selectedPodiumPlace && (
                <AddWinnerModal
                    isOpen={isOpen}
                    onClose={onClose}
                    podiumPlace={selectedPodiumPlace}
                    date={week.endDate}
                    users={users}
                />
            )}
            <WinnersTable
                winners={winners.reduce((acc, cur) => {
                    return {
                        ...acc,
                        [cur.podiumPlace]: {
                            ...users.get(cur.userId),
                            score: usersActivities.find((activity) => activity.userId === cur.userId)?.score,
                        },
                    };
                }, {} as Record<PodiumPlace, User & UserActivity>)}
                isLoading={isLoading}
                onClick={isAdmin ? handleClicked : undefined}
            />
        </>
    );
};
