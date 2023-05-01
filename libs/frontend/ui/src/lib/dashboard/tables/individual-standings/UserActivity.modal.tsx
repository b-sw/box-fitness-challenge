import { Week } from '@box-fc/frontend/domain';
import { UserActivity } from '@box-fc/shared/types';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    activity: UserActivity;
    range: Week;
};

export const UserActivityModal = ({ isOpen, onClose, activity, range }: Props) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User is not registered</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    If you believe this is an error then please contact <b>help@graderef.com</b>.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
