import { PodiumPlace, Week } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { User, UserActivity } from '@box-fc/shared/types';
// import { PodiumPlace, User, UserActivity } from '@box-fc/shared/types';
import { Flex, Spacer } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { NoRecords } from '../utils/no-records/NoRecords';
import { SearchInput } from '../utils/search/SearchInput';
import { TablePanel } from '../utils/table-panel/TablePanel';
import { PodiumItem } from './PodiumItem';
import { UserActivityListItem } from './UserActivity.list-item';

type Props = {
    week: Week;
    users: Map<User['id'], User>;
};

export const IndividualStandingsTable = ({ week, users }: Props) => {
    const [filter, setFilter] = useState<string>('');
    const { usersActivities, usersActivitiesAreLoading } = useActivitiesQuery({ ...week });
    const [filteredActivities, setFilteredActivities] = useState<UserActivity[]>(usersActivities);

    useEffect(() => {
        const filteredActivities = getFilteredActivities();

        setFilteredActivities(filteredActivities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, usersActivities]);

    const getListItems = (): ReactNode => {
        if (!filteredActivities.length || users.size === 0) {
            return <NoRecords />;
        }

        return filteredActivities.map((activity, index) => (
            <UserActivityListItem
                key={`user-activity-${index}`}
                userActivity={activity}
                user={users.get(activity.userId) as User}
                onClick={() => null}
                topScore={usersActivities[0].score}
            />
        ));
    };

    const getFilteredActivities = (): UserActivity[] => {
        return usersActivities.filter((userActivity) => {
            const { firstName, lastName, email, team } = users.get(userActivity.userId) as User;
            const searchedProps = [firstName, lastName, email, team, `${firstName} ${lastName}`];

            return searchedProps.some((value) => value?.toLowerCase().includes(filter.toLowerCase()));
        });
    };

    const getPodiumItem = (podiumPlace: PodiumPlace): ReactNode => {
        if (usersActivities.length < podiumPlace) {
            return <PodiumItem user={null} score={null} podiumPlace={podiumPlace} maxScore={null} />;
        }

        const { userId, score } = usersActivities[podiumPlace - 1];

        return (
            <PodiumItem user={users.get(userId)} score={score} podiumPlace={2} maxScore={usersActivities[0].score} />
        );
    };

    // TODO: Add loading state
    if (usersActivitiesAreLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Flex direction={'column'} border={'1px'} h={'100%'} gap={5}>
            <Flex h={'30%'} border={'1px solid red'}>
                <Flex direction={'column'}>
                    <Spacer />
                    {getPodiumItem(PodiumPlace.SECOND)}
                    <Spacer />
                </Flex>

                <Spacer />

                <Flex direction={'column'}>{getPodiumItem(PodiumPlace.FIRST)}</Flex>

                <Spacer />

                <Flex direction={'column'}>
                    <Spacer />
                    {getPodiumItem(PodiumPlace.THIRD)}
                </Flex>
            </Flex>

            <Spacer />

            <TablePanel options={{ w: '500px' }}>
                <SearchInput handleChange={setFilter} placeholder={'Search people'} />

                <Flex
                    direction={'column'}
                    h={'fit-content'}
                    overflowY={'scroll'}
                    backgroundColor={'gray.50'}
                    borderRadius={25}
                >
                    {getListItems()}
                </Flex>
            </TablePanel>
        </Flex>
    );
};
