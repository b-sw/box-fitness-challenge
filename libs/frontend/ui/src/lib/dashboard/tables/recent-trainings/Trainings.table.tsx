import { Training, useAuthQuery, useMobileQuery, useUsersQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { TrainingCreateModal } from 'libs/frontend/ui/src/lib/header/training-button/Training.create-modal';
import { useState } from 'react';
import { TrainingDeleteModal } from './Training.delete.modal';
import { TrainingsTableRaw } from './Trainings.table.raw';

type Props = {
    trainings: Training[];
};

export const TrainingsTable = ({ trainings }: Props) => {
    const { users } = useUsersQuery();
    const { isAdmin } = useAuthQuery();
    const { isMobile } = useMobileQuery();
    const { user } = useAuthStore();

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const [selectedActivity, setSelectedActivity] = useState<Training | null>(null);

    return (
        <>
            {selectedActivity && users.has(selectedActivity.userId) && isDeleteOpen && (
                <TrainingDeleteModal
                    user={users.get(selectedActivity.userId) as User}
                    activity={selectedActivity as Training}
                    isOpen={isDeleteOpen}
                    onClose={onDeleteClose}
                />
            )}
            <TrainingCreateModal isOpen={isCreateOpen} handleClose={onCreateClose} />
            <TrainingsTableRaw
                trainings={trainings}
                users={users}
                currentUserId={user.id}
                readonly={!isAdmin}
                handleDelete={(activity: Training) => {
                    setSelectedActivity(activity);
                    onDeleteOpen();
                }}
                handleCreate={onCreateOpen}
                isMobile={isMobile}
            />
        </>
    );
};
