import { Training } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/utc';
import { DATETIME_FORMAT } from '../../../utils/datetime/datetime.format';
import { ColonList } from '../../../utils/generic-components/ColonList';
import { ListItem } from '../../../utils/list-item/ListItem';

type Props = {
    training: Training;
    user: User;
    readonly: boolean;
    handleDelete: (activity: Training) => void;
    isMobile: boolean;
};

export const TrainingListItem = ({ training, user, readonly, handleDelete, isMobile }: Props) => {
    return (
        <ListItem>
            {personalActivityItem(user, training, isMobile)}

            <Spacer />

            {!readonly && (
                <Flex>
                    <IconButton
                        aria-label="IconButton2"
                        icon={<DeleteIcon />}
                        variant={'ghost'}
                        onClick={() => handleDelete(training)}
                    />
                </Flex>
            )}
        </ListItem>
    );
};

export const personalActivityItem = (user: User, activity: Training, isMobile: boolean) => {
    const trainingDate = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('DD-MM-YYYY');
    const trainingTime = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('HH:mm');

    const trainingFieldsNames = (
        <>
            <Text fontSize={'sm'} color={'gray.800'}>
                Duration:
            </Text>
            <Text fontSize={'sm'} color={'gray.800'}>
                Activity:
            </Text>
            <Text fontSize={'sm'} color={'gray.800'}>
                Date:
            </Text>
            <Text fontSize={'sm'} color={'gray.800'}>
                Time:
            </Text>
        </>
    );

    const trainingFieldsValues = (
        <>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
            </Text>
            <Text fontSize={'sm'}>
                <Badge colorScheme={'facebook'} variant={'outline'}>
                    {activity.type}
                </Badge>
            </Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {trainingDate}
            </Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {trainingTime}
            </Text>
        </>
    );

    return (
        <Flex direction={['column', 'row']} w={'100%'}>
            <Flex w={['100%', '60%']} alignItems={'center'} gap={1}>
                <Avatar size={'sm'} />
                <Flex direction={'column'}>
                    <Flex alignItems={'center'} gap={1}>
                        <Badge colorScheme="whatsapp" fontSize={'xs'}>
                            {user.team}
                        </Badge>
                        <Text fontSize={'md'}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </Flex>
                    <Text fontSize={'sm'} color={'gray.400'}>
                        {user.email}
                    </Text>
                </Flex>
            </Flex>

            <ColonList
                xlWidth={'40%'}
                isMobile={isMobile}
                leftChildren={trainingFieldsNames}
                rightChildren={trainingFieldsValues}
            />
        </Flex>
    );
};
