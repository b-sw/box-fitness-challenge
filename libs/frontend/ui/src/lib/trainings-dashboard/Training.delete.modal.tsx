import { Training, useTrainingMutation } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { toastError, toastSuccess } from '../utils/toast/toast-info';
import { personalActivityItem } from './Training.list-item';

type Props = {
    user: User;
    activity: Training;
    isOpen: boolean;
    onClose: () => void;
};

export const TrainingDeleteModal = ({ user, activity, isOpen, onClose }: Props) => {
    const { deleteMutation } = useTrainingMutation();
    const toast = useToast();

    const deleteActivity = () => {
        deleteMutation.mutate(activity.id);
    };

    useEffect(() => {
        if (deleteMutation.isError) {
            toastError(toast, 'Error deleting activity');
        }

        if (deleteMutation.isSuccess) {
            onClose();
            toastSuccess(toast, 'Activity deleted');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteMutation.status]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent pb={5} bg={'boxBlue.123'}>
                <ModalBody>
                    <Flex direction={'column'} gap={3}>
                        <Text fontWeight={'bold'} color={'gray.50'}>
                            Are you sure you want to delete the following training?
                        </Text>
                        <Flex p={3} borderRadius={20} alignItems={'center'} backgroundColor={'gray.50'}>
                            {personalActivityItem(user, activity)}
                        </Flex>
                        <Text fontWeight={'bold'} color={'gray.50'}>
                            You can't undo this action afterwards.
                        </Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Spacer />

                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        bg={'red.500'}
                        textColor={'gray.50'}
                        onClick={deleteActivity}
                        isLoading={deleteMutation.isLoading}
                        ml={3}
                    >
                        Delete
                    </Button>

                    <Spacer />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
