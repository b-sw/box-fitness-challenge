import { useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { EditIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, IconButton, Spacer, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { HeightRegulator } from '../utils/generic-components/HeightRegulator';
import { ListItem } from '../utils/list-item/ListItem';
import { NoRecords } from '../utils/no-records/NoRecords';
import { SearchInput } from '../utils/search/SearchInput';
import { TablePanel } from '../utils/table-panel/TablePanel';
import { UserTeamEditModal } from './UserTeam.edit-modal';

export const TeamsDashboard = () => {
    const { users } = useUsersQuery();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [filter, setFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleUserClicked = (user: User) => {
        setSelectedUser(user);
        onEditOpen();
    };

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

    const getUserListItem = (user: User) => (
        <ListItem
            key={`user-list-item-${user.id}`}
            options={{ onClick: () => handleUserClicked(user), cursor: 'pointer' }}
        >
            <HeightRegulator />
            <Flex direction={'row'} w={'100%'}>
                <Flex w={'70%'} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} src={user.imageUrl} shadow={'md'} />

                    <Flex direction={'column'} gap={1}>
                        <Tooltip label={`${user.email}`}>
                            <Text fontSize={'lg'}>
                                {user.firstName} {user.lastName}
                            </Text>
                        </Tooltip>
                        <Flex>
                            <Badge
                                fontSize={'10'}
                                fontWeight={'italic'}
                                textColor={'boxBlue.500'}
                                backgroundColor={'blue.50'}
                                border={'1px'}
                                borderRadius={15}
                            >
                                <Text px={1}>{user.team ?? 'N/A team'}</Text>
                            </Badge>
                        </Flex>
                    </Flex>
                </Flex>

                <Spacer />

                <Flex alignItems={'center'}>
                    <IconButton
                        aria-label="edit-user-button"
                        icon={<EditIcon />}
                        variant={'ghost'}
                        onClick={() => handleUserClicked(user)}
                    />
                </Flex>
            </Flex>
        </ListItem>
    );

    return (
        <>
            {selectedUser && <UserTeamEditModal isOpen={isEditOpen} handleClose={onEditClose} user={selectedUser} />}
            <Dashboard>
                <Flex alignItems={'center'} w={'500px'}>
                    <Spacer />

                    <Flex w={'80%'}>
                        <Spacer />
                        <Text fontSize={'4xl'} fontWeight={'bold'} color={'gray.50'}>
                            Teams
                        </Text>
                        <Spacer />
                    </Flex>

                    <Spacer />
                </Flex>

                <TablePanel>
                    <SearchInput handleChange={setFilter} placeholder={'Search users'} />

                    <Flex
                        w={'100%'}
                        direction={'column'}
                        h={'fit-content'}
                        overflowY={'scroll'}
                        backgroundColor={'gray.50'}
                        borderRadius={25}
                    >
                        {filteredUsers.length ? filteredUsers.map((user) => getUserListItem(user)) : <NoRecords />}
                    </Flex>
                </TablePanel>
            </Dashboard>
        </>
    );
};
