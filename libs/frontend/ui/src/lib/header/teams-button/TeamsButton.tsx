import { useUsersQuery } from '@box-fc/frontend/query';
import { useDisclosure } from '@chakra-ui/react';
import { TeamsButtonRaw } from './TeamsButton.raw';
import { UsersModal } from './Users.modal';

export const TeamsButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users } = useUsersQuery();

    return (
        <>
            <UsersModal isOpen={isOpen} handleClose={onClose} users={[...users.values()]} />
            <TeamsButtonRaw handleClicked={onOpen} />
        </>
    );
};
