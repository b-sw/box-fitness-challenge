import { Training } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/plugin/utc';
import { DATETIME_FORMAT } from '../../../utils/datetime/datetime.format';

type PersonalListItemProps = {
    training: Training;
    user: User;
    readonly: boolean;
    handleDelete: (activity: Training) => void;
};

export const TrainingListItem = ({ training, user, readonly, handleDelete }: PersonalListItemProps) => {
    return (
        <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            {personalActivityItem(user, training)}

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
        </Flex>
    );
};

export const personalActivityItem = (user: User, activity: Training) => {
    const trainingDate = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('DD-MM-YYYY');
    const trainingTime = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('HH:mm');

    return (
        <>
            <HStack w={'50%'}>
                <Avatar size={'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <HStack>
                        <Badge colorScheme="whatsapp" fontSize={'xs'}>
                            {user.team}
                        </Badge>
                        <Text fontSize={'md'}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </HStack>
                    <VStack alignItems={'baseline'} spacing={0}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            {user.email}
                        </Text>
                    </VStack>
                </VStack>
            </HStack>

            <Spacer />

            <Flex w={'40%'} gap={1}>
                <Flex direction={'column'} alignItems={'flex-end'}>
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
                </Flex>

                <Flex direction={'column'} alignItems={'flex-start'}>
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
                </Flex>
            </Flex>
        </>
    );
};
