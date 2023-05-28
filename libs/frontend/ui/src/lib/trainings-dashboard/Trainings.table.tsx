import { Training, useAuthQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { TrainingCreateModal } from './Training.create-modal';
import { TrainingDeleteModal } from './Training.delete.modal';
import { TrainingsTableRaw } from './Trainings.table.raw';

type Props = {
    trainings: Training[];
    hideCreate?: boolean;
};

export const TrainingsTable = ({ trainings, hideCreate }: Props) => {
    const { users } = useUsersQuery();
    const { isAdmin } = useAuthQuery();

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
                readonly={!isAdmin}
                handleDelete={(activity: Training) => {
                    setSelectedActivity(activity);
                    onDeleteOpen();
                }}
                handleCreate={onCreateOpen}
                showCreate={!hideCreate}
            />
        </>
    );
};
