import { useAuthQuery } from '@box-fc/data-access';
import { ActivityButtonRaw } from '@box-fc/ui-header';
import { useDisclosure } from '@chakra-ui/react';
// import { ActivityCreateModal } from './ActivityCreateModal';

export const ActivityButton = () => {
    const { isLoggedIn } = useAuthQuery();
    const { isOpen: isActivityModalOpen, onOpen: onActivityModalOpen, onClose: onActivityModalClose } = useDisclosure();

    return (
        <>
            {/*<ActivityCreateModal isOpen={isActivityModalOpen} handleClose={onActivityModalClose} />*/}
            <ActivityButtonRaw isEnabled={isLoggedIn} handleClicked={onActivityModalOpen} />
        </>
    );
};
