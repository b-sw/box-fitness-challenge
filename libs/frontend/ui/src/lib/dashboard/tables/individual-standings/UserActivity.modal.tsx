import { DatesRange } from '@box-fc/frontend/domain';
import { Training, useMobileQuery, useUserTrainingsQuery } from '@box-fc/frontend/query';
import { User, UserActivity } from '@box-fc/shared/types';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { TrainingListItem } from '../recent-trainings/Training.list-item';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    activity: UserActivity;
    range: DatesRange;
    users: Map<User['id'], User>;
};

export const UserActivityModal = ({ isOpen, onClose, activity, range, users }: Props) => {
    const { userTrainings } = useUserTrainingsQuery({ userId: activity.userId });
    const [trainingsInRange, setTrainingsInRange] = useState<Training[]>([]);
    const { isMobile } = useMobileQuery();

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
            return <NoRecords />;
        }

        return trainingsInRange.map((training) => (
            <TrainingListItem
                key={`personal-training-${training.id}`}
                training={training}
                user={users.get(training.userId) as User}
                readonly={true}
                handleDelete={() => null}
                isMobile={isMobile}
            />
        ));
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User's trainings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={'column'} gap={2} overflowY={'scroll'} maxH={'70vh'}>
                        {getTrainings()}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
