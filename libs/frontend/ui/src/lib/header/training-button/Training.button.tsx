import { useDisclosure } from '@chakra-ui/react';
import { TrainingButtonRaw } from './Training.button.raw';
import { TrainingCreateModal } from './Training.create-modal';

export const TrainingButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <TrainingCreateModal isOpen={isOpen} handleClose={onClose} />
            <TrainingButtonRaw handleClicked={onOpen} />
        </>
    );
};
