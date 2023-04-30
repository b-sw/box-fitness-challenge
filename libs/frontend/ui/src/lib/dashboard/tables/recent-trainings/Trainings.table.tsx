import { Training, useAuthQuery, useTrainingsQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { isEmptyObject } from '../../../utils/object/is-empty';
import { TrainingDeleteModal } from './Training.delete.modal';
import { TrainingsTableRaw } from './Trainings.table.raw';

export const TrainingsTable = () => {
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { activitiesQuery } = useTrainingsQuery();
    const { users } = useUsersQuery();
    const { isAdmin, currentUserId } = useAuthQuery();
    const [mappedUsers, setMappedUsers] = useState<{ [key: string]: User }>({});
    const [selectedActivity, setSelectedActivity] = useState<Training | null>(null);

    useEffect(() => {
        if (!activitiesQuery.data?.length || !users?.length) {
            return;
        }
        setMappedUsers(users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [activitiesQuery.data, users]);

    return (
        <>
            {!isEmptyObject(mappedUsers) && isDeleteModalOpen && (
                <TrainingDeleteModal
                    user={mappedUsers[selectedActivity?.userId as string]}
                    activity={selectedActivity as Training}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                />
            )}
            <TrainingsTableRaw
                activities={activitiesQuery.data ?? []}
                users={mappedUsers}
                currentUserId={currentUserId}
                readonly={!isAdmin}
                handleDelete={(activity: Training) => {
                    setSelectedActivity(activity);
                    onDeleteModalOpen();
                }}
            />
        </>
    );
};
