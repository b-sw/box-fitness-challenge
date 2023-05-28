import { Week } from '@box-fc/frontend/domain';
import { Training, useUserTrainingsQuery } from '@box-fc/frontend/query';
import { UserActivity } from '@box-fc/shared/types';
import { Flex, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TrainingsTable } from '../../trainings-dashboard/Trainings.table';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    activity: UserActivity;
    range: Week;
};

export const UserActivityModal = ({ isOpen, onClose, activity, range }: Props) => {
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

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
            <ModalOverlay />1
            <ModalContent pb={5} bg={'boxBlue.123'}>
                <ModalBody p={0}>
                    <Flex h={'70vh'}>
                        <TrainingsTable trainings={trainingsInRange} hideCreate={true} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
