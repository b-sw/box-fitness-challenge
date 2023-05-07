import { Training, useMobileQuery, useTrainingMutation } from '@box-fc/frontend/query';
import { toastError, toastSuccess } from '@box-fc/frontend/ui';
import { User } from '@box-fc/shared/types';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
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
    const { isMobile } = useMobileQuery();

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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete referee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                        Are you sure you want to delete the following referee?
                    </Text>
                    <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
                        {personalActivityItem(user, activity, isMobile)}
                    </Flex>
                    <Text fontWeight="bold" mt="1rem">
                        You can't undo this action afterwards.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme="red" onClick={deleteActivity} isLoading={deleteMutation.isLoading} ml={3}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
