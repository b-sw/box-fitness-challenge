import { Activity, useActivitiesQuery, useAuthQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { isEmptyObject } from '../../../utils/object/is-empty';
import { TrainingDeleteModal } from './Training.delete.modal';
import { TrainingsTableRaw } from './Trainings.table.raw';

export const TrainingsTable = () => {
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { activitiesQuery } = useActivitiesQuery();
    const { usersQuery } = useUsersQuery();
    const { isAdmin, currentUserId } = useAuthQuery();
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    useEffect(() => {
        if (!activitiesQuery.data?.length || !usersQuery.data?.length) {
            return;
        }
        setUsers(usersQuery.data.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [activitiesQuery.data, usersQuery.data]);

    return (
        <>
            {!isEmptyObject(users) && isDeleteModalOpen && (
                <TrainingDeleteModal
                    user={users[selectedActivity?.userId as string]}
                    activity={selectedActivity as Activity}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                />
            )}
            <TrainingsTableRaw
                activities={activitiesQuery.data ?? []}
                users={users}
                currentUserId={currentUserId}
                readonly={!isAdmin}
                handleDelete={(activity: Activity) => {
                    setSelectedActivity(activity);
                    onDeleteModalOpen();
                }}
            />
        </>
    );
};
