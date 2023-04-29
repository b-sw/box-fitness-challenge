import { useAuthQuery } from '@box-fc/frontend/query';
import { useDisclosure } from '@chakra-ui/react';
import { TrainingButtonRaw } from './training-button/Training.button.raw';
import { TrainingCreateModal } from './Training.create-modal';

export const TrainingButton = () => {
    const { isLoggedIn } = useAuthQuery();
    const { isOpen: isActivityModalOpen, onOpen: onActivityModalOpen, onClose: onActivityModalClose } = useDisclosure();

    return (
        <>
            <TrainingCreateModal isOpen={isActivityModalOpen} handleClose={onActivityModalClose} />
            <TrainingButtonRaw isEnabled={isLoggedIn} handleClicked={onActivityModalOpen} />
        </>
    );
};
