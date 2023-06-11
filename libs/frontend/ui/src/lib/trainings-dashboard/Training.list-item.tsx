import { Training } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { CalendarIcon } from '@chakra-ui/icons';
import { Avatar, Badge, CircularProgress, CircularProgressLabel, Flex, Text, Tooltip } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/utc';
import { DATETIME_FORMAT } from '../utils/datetime/datetime.format';
import { ListItem } from '../utils/list-item/ListItem';

type Props = {
    training: Training;
    user: User;
    readonly: boolean;
    handleDelete: (activity: Training) => void;
};

export const TrainingListItem = ({ training, user, readonly, handleDelete }: Props) => {
    const handleClicked = () => {
        if (readonly) {
            return;
        }
        handleDelete(training);
    };

    return (
        <ListItem options={{ onClick: handleClicked, cursor: readonly ? 'default' : 'pointer' }}>
            {personalActivityItem(user, training)}
        </ListItem>
    );
};

export const personalActivityItem = (user: User, activity: Training) => {
    const trainingDate = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('DD MMM YYYY');
    const trainingTime = dayjs.utc(activity.trainingDate, DATETIME_FORMAT).local().format('HH:mm');

    const durationPercentage = (activity.duration / 180) * 100;
    const displayedDuration = formatMinutes(activity.duration);

    return (
        <Flex direction={'column'} w={'100%'}>
            <Flex direction={['column', 'row']} w={'100%'} gap={[3, 0]}>
                <Flex w={['100%', '50%']} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} src={user.imageUrl} shadow={'md'} />

                    <Flex direction={'column'} gap={1}>
                        <Tooltip label={`${user.firstName} ${user.lastName}`}>
                            <Text fontSize={'lg'}>{user.firstName}</Text>
                        </Tooltip>
                        <Flex>
                            <Badge
                                fontSize={'10'}
                                fontWeight={'italic'}
                                textColor={'boxBlue.500'}
                                backgroundColor={'blue.50'}
                                border={'1px'}
                                borderRadius={15}
                            >
                                <Text px={1}>{user.team ?? 'N/A team'}</Text>
                            </Badge>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w={['100%', '50%']} alignItems={'center'} gap={3}>
                    <Flex w={'40%'}>
                        <CircularProgress value={durationPercentage} color={'boxBlue.500'} size={'55px'}>
                            <CircularProgressLabel>{displayedDuration}</CircularProgressLabel>
                        </CircularProgress>
                    </Flex>

                    <Flex direction={'column'} w={'80%'} overflow={'hidden'}>
                        <Badge
                            variant={'solid'}
                            backgroundColor={'gray.300'}
                            textColor={'gray.800'}
                            alignSelf={'center'}
                            w={'100%'}
                            borderRadius={15}
                            letterSpacing={'.5px'}
                        >
                            <Tooltip label={`${activity.type}`}>
                                <Text px={2} py={1} textOverflow={'ellipsis'} overflow={'hidden'}>
                                    {activity.type}
                                </Text>
                            </Tooltip>
                        </Badge>
                        <Flex fontSize={'xs'} opacity={'0.6'} alignItems={'center'} gap={1} w={'100%'} p={1}>
                            <CalendarIcon />
                            <Text>
                                {trainingDate} {trainingTime}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedMinutes = String(remainingMinutes).padStart(2, '0');

    return `${hours}:${formattedMinutes}`;
};
