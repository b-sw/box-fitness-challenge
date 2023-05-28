import { User, UserActivity } from '@box-fc/shared/types';
import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { NoRecords } from '../../utils/no-records/NoRecords';
import { SearchInput } from '../../utils/search/SearchInput';
import { TablePanel } from '../../utils/table-panel/TablePanel';
import { UserActivityListItem } from './UserActivity.list-item';

type Props = {
    users: Map<User['id'], User>;
    usersActivities: UserActivity[];
    handleActivityClicked: (activity: UserActivity) => void;
};

export const IndividualStandingsTable = ({ users, usersActivities, handleActivityClicked }: Props) => {
    const [filter, setFilter] = useState<string>('');
    const [filteredActivities, setFilteredActivities] = useState<UserActivity[]>(usersActivities);

    useEffect(() => {
        const newFilteredActivities = getFilteredActivities(usersActivities, users, filter);

        setFilteredActivities(newFilteredActivities);
    }, [usersActivities, users, filter]);

    const getListItems = (): ReactNode => {
        if (!usersActivities.length || !filteredActivities.length || !users.size) {
            return <NoRecords />;
        }

        return filteredActivities.map((activity, index) => (
            <UserActivityListItem
                key={`user-activity-${index}`}
                userActivity={activity}
                user={users.get(activity.userId) as User}
                onClick={handleActivityClicked}
                topScore={usersActivities[0].score}
            />
        ));
    };

    return (
        <TablePanel>
            <SearchInput handleChange={setFilter} placeholder={'Search people'} />

            <Flex
                w={'100%'}
                direction={'column'}
                h={'fit-content'}
                overflowY={'scroll'}
                backgroundColor={'gray.50'}
                borderRadius={25}
            >
                {getListItems()}
            </Flex>
        </TablePanel>
    );
};

const getFilteredActivities = (
    usersActivities: UserActivity[],
    users: Map<User['id'], User>,
    filter: string,
): UserActivity[] => {
    return usersActivities.filter((userActivity) => {
        const { firstName, lastName, email, team } = users.get(userActivity.userId) as User;
        const searchedProps = [firstName, lastName, email, team, `${firstName} ${lastName}`];

        return searchedProps.some((value) => value?.toLowerCase().includes(filter.toLowerCase()));
    });
};
