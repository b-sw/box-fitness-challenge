import { ActivityQueryType, useActivitiesQuery, useAuthQuery, useUsersQuery } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { isEmptyObject } from '../../../utils/object/is-empty';
import { ActivityDeleteModal } from './ActivityDeleteModal';
import { PersonalDetailedTableRaw } from './PersonalDetailed.table.raw';

export const PersonalDetailedTable = () => {
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { activitiesQuery } = useActivitiesQuery();
    const { usersQuery } = useUsersQuery();
    const { isAdmin } = useAuthQuery();
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const [selectedActivity, setSelectedActivity] = useState<ActivityQueryType | null>(null);

    useEffect(() => {
        if (!activitiesQuery.data?.length || !usersQuery.data?.length) {
            return;
        }
        setUsers(usersQuery.data.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
    }, [activitiesQuery.data, usersQuery.data]);

    return (
        <>
            {!isEmptyObject(users) && isDeleteModalOpen && (
                <ActivityDeleteModal
                    user={users[selectedActivity?.userId as string]}
                    activity={selectedActivity as ActivityQueryType}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                />
            )}
            <PersonalDetailedTableRaw
                activities={activitiesQuery.data ?? []}
                users={users}
                readonly={!isAdmin}
                handleDelete={(activity: ActivityQueryType) => {
                    setSelectedActivity(activity);
                    onDeleteModalOpen();
                }}
            />
        </>
    );
};
