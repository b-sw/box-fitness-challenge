import { PodiumPlace } from '@box-fc/frontend/domain';
import { useWinnerMutation } from '@box-fc/frontend/query';
import { toastError, toastSuccess } from '@box-fc/frontend/ui';
import { User } from '@box-fc/shared/types';
import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { UsersTable } from '../tables/Users.table';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    podiumPlace: PodiumPlace;
    date: Dayjs;
    users: Map<User['id'], User>;
};

export const AddWinnerModal = ({ isOpen, onClose, podiumPlace, date, users }: Props) => {
    const { createMutation } = useWinnerMutation();
    const toast = useToast();

    useEffect(() => {
        if (createMutation.isSuccess) {
            onClose();
            toastSuccess(toast, 'Winner registered');
        }

        if (createMutation.isError) {
            toastError(toast, (createMutation.error as Error).message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createMutation.status]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent pb={5} bg={'boxBlue.123'}>
                <ModalBody p={0}>
                    <Flex h={'70vh'} alignItems={'flex-start'}>
                        <UsersTable
                            users={users}
                            onUserClicked={(user) =>
                                createMutation.mutate({
                                    podiumPlace,
                                    date: date.toDate(),
                                    userId: user.id,
                                })
                            }
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
