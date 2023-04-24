import { useAuthQuery } from '@box-fc/frontend/query';
import { useDisclosure } from '@chakra-ui/react';
import { ActivityCreateModal } from 'libs/frontend/ui/src/lib/header/ActivityCreateModal';
import { ActivityButtonRaw } from './activity-button/ActivityButton.raw';

export const ActivityButton = () => {
    const { isLoggedIn } = useAuthQuery();
    const { isOpen: isActivityModalOpen, onOpen: onActivityModalOpen, onClose: onActivityModalClose } = useDisclosure();

    return (
        <>
            <ActivityCreateModal isOpen={isActivityModalOpen} handleClose={onActivityModalClose} />
            <ActivityButtonRaw isEnabled={isLoggedIn} handleClicked={onActivityModalOpen} />
        </>
    );
};
