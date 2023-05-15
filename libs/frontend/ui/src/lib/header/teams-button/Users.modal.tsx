import { ListItem } from '@box-fc/frontend/ui';
import { User } from '@box-fc/shared/types';
import { EditIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Badge,
    Button,
    Flex,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../utils/no-records/NoRecords';
import { SearchInput } from '../../utils/search/SearchInput';
import { UserTeamEditModal } from './UserTeam.edit-modal';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    users: User[];
};

export const UsersModal = ({ isOpen, handleClose, users }: Props) => {
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
            users.filter((user) =>
                [user.firstName, user.lastName].some((value) => value.toLowerCase().includes(filter.toLowerCase())),
            ),
        );
    }, [filter, users]);

    const getUserListItem = (user: User) => (
        <ListItem key={`user-list-item-${user.id}`}>
            <Flex direction={['column', 'row']} w={'100%'}>
                <Flex w={['100%', '90%']} gap={1} alignItems={'center'}>
                    <Avatar size={'md'} src={user.imageUrl} />
                    <Flex direction={'column'}>
                        <Text fontSize={'md'}>
                            {user.firstName} {user.lastName}
                        </Text>
                        <Flex>
                            <Badge colorScheme="linkedin" fontSize={'xs'}>
                                {user.team ?? 'N/A team'}
                            </Badge>
                        </Flex>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            {user.email}
                        </Text>
                    </Flex>
                </Flex>

                <Spacer />

                <Flex w={['100%', '10%']} alignItems={'center'}>
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
            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex direction={'row'}>
                            <Text fontWeight={'bold'} fontSize={'2xl'}>
                                Users teams assignment
                            </Text>
                            <Spacer />
                        </Flex>
                    </ModalHeader>

                    <ModalBody>
                        <Flex direction={'column'} maxH={'70vh'}>
                            <SearchInput handleChange={setFilter} />

                            <Flex direction={'column'} gap={2} overflowY={'scroll'}>
                                {filteredUsers.length ? (
                                    filteredUsers.map((user) => getUserListItem(user))
                                ) : (
                                    <NoRecords />
                                )}
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
