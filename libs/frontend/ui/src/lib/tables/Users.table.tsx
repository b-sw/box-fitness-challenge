import { User } from '@box-fc/shared/types';
import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { UserListItem } from '../list-items/User.list-item';
import { NoRecords } from '../utils/no-records/NoRecords';
import { SearchInput } from '../utils/search/SearchInput';
import { TablePanel } from '../utils/table-panel/TablePanel';

type Props = {
    users: Map<User['id'], User>;
    onUserClicked: (user: User) => void;
    listItemButton?: ReactNode;
};

export const UsersTable = ({ users, onUserClicked, listItemButton }: Props) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setFilteredUsers(
            [...users.values()].filter((user) =>
                [
                    user.firstName,
                    user.lastName,
                    `${user.firstName} ${user.lastName}`,
                    ...(user.team ? [user.team] : []),
                ].some((value) => value.toLowerCase().includes(filter.toLowerCase())),
            ),
        );
    }, [filter, users]);

    return (
        <TablePanel>
            <SearchInput handleChange={setFilter} placeholder={'Search users'} />

            <Flex
                w={'100%'}
                direction={'column'}
                shadow={'md'}
                h={'fit-content'}
                overflowY={'scroll'}
                backgroundColor={'gray.50'}
                borderRadius={25}
            >
                {filteredUsers.length ? (
                    filteredUsers.map((user) => (
                        <UserListItem user={user} onClick={onUserClicked} button={listItemButton} />
                    ))
                ) : (
                    <NoRecords />
                )}
            </Flex>
        </TablePanel>
    );
};
