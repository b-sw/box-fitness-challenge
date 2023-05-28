import { Week } from '@box-fc/frontend/domain';
import { Training, useUserTrainingsQuery } from '@box-fc/frontend/query';
import { User, UserActivity } from '@box-fc/shared/types';
import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spacer } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TrainingListItem } from '../trainings-dashboard/Training.list-item';
import { TrainingsTable } from '../trainings-dashboard/Trainings.table';
import { NoRecords } from '../utils/no-records/NoRecords';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    activity: UserActivity;
    range: Week;
    users: Map<User['id'], User>;
};

export const UserActivityModal = ({ isOpen, onClose, activity, range, users }: Props) => {
    const { userTrainings } = useUserTrainingsQuery({ userId: activity.userId });
    const [trainingsInRange, setTrainingsInRange] = useState<Training[]>([]);

    useEffect(() => {
        const trainingsInRange = userTrainings.filter(({ trainingDate }) => {
            const { startDate, endDate } = range;

            return dayjs(trainingDate).isBetween(dayjs(startDate), dayjs(endDate));
        });

        setTrainingsInRange(trainingsInRange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTrainings]);

    const getTrainings = () => {
        if (trainingsInRange.length === 0) {
            // todo: await before opening
            return <NoRecords />;
        }

        return trainingsInRange.map((training) => (
            <TrainingListItem
                key={`personal-training-${training.id}`}
                training={training}
                user={users.get(training.userId) as User}
                readonly={true}
                handleDelete={() => null}
            />
        ));
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent pb={5}>
                <ModalBody p={0}>
                    <Flex h={'70vh'}>
                        <TrainingsTable trainings={trainingsInRange} />
                    </Flex>
                </ModalBody>
                <ModalFooter p={0}>
                    <Flex w={'100%'}>
                        <Spacer />
                        <Button onClick={onClose}>Close</Button>
                        <Spacer />
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
