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
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {trainingDate}
            </Text>
            <Text fontSize={'sm'} fontWeight={'bold'}>
                {trainingTime}
            </Text>
        </>
    );

    return (
        <Flex direction={'column'} w={'100%'}>
            <Flex direction={['column', 'row']} w={'100%'}>
                <Flex w={['100%', '65%']} alignItems={'center'} gap={1}>
                    <Avatar size={'md'} src={user.imageUrl} />
                    <Flex direction={'column'}>
                        <Flex alignItems={'center'} gap={1}>
                            <Text fontSize={'lg'}>
                                {user.firstName} {user.lastName}
                            </Text>
                        </Flex>
                        <Badge colorScheme="linkedin" fontSize={'xs'}>
                            {user.team ?? 'N/A team'}
                        </Badge>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            {user.email}
                        </Text>
                    </Flex>
                </Flex>

                <ColonList
                    xlWidth={'35%'}
                    isMobile={isMobile}
                    leftChildren={trainingFieldsNames}
                    rightChildren={trainingFieldsValues}
                />
            </Flex>

            <Flex alignItems={'center'} gap={1}>
                <Spacer />

                <Text fontSize={'md'} color={'gray.800'}>
                    Activity:
                </Text>
                <Text fontSize={'md'}>
                    <Badge colorScheme={'facebook'} variant={'outline'}>
                        {activity.type}
                    </Badge>
                </Text>

                <Spacer />
            </Flex>
        </Flex>
    );
};
