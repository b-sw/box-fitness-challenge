import { useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { UsersTable } from '../tables/Users.table';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { UserTeamEditModal } from './UserTeam.edit-modal';

export const TeamsDashboard = () => {
    const { users } = useUsersQuery();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleUserClicked = (user: User) => {
        setSelectedUser(user);
        onEditOpen();
    };

    const button = <IconButton aria-label="edit-user-button" icon={<EditIcon />} variant={'ghost'} />;

    return (
        <>
            {selectedUser && <UserTeamEditModal isOpen={isEditOpen} handleClose={onEditClose} user={selectedUser} />}
            <Dashboard>
                <Flex alignItems={'center'} w={'500px'}>
                    <Spacer />

                    <Flex w={'80%'}>
                        <Spacer />
                        <Text fontSize={'4xl'} fontWeight={'bold'} color={'gray.700'}>
                            Teams
                        </Text>
                        <Spacer />
                    </Flex>

                    <Spacer />
                </Flex>

                <UsersTable users={users} onUserClicked={handleUserClicked} listItemButton={button} />
            </Dashboard>
        </>
    );
};
