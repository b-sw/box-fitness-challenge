import { ActivityQueryType, useActivityMutation } from '@box-fc/frontend/query';
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
} from '@chakra-ui/react';
import { personalActivityItem } from './PersonalActivityListItem';

type Props = {
    user: User;
    activity: ActivityQueryType;
    isOpen: boolean;
    onClose: () => void;
};

export const ActivityDeleteModal = ({ user, activity, isOpen, onClose }: Props) => {
    const { deleteMutation } = useActivityMutation();

    const deleteActivity = () => {
        deleteMutation.mutate(activity.id);
    };

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
                        {personalActivityItem(user, activity)}
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
