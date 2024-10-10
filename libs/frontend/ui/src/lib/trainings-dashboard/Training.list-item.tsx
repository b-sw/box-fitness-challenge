import { Training } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { CalendarIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, Spacer, Tag, TagLabel, Text, Tooltip } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/utc';
import { FaBolt } from 'react-icons/fa';
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

    const durationPercentage = (activity.distance / 180) * 100;
    const displayedDuration = formatMinutes(activity.distance);

    return (
        <Flex direction={'column'} w={'100%'}>
            <Flex direction={['column', 'row']} w={'100%'} gap={[3, 0]}>
                <Flex w={['100%', '25%']} alignItems={'center'} gap={3}>
                    <Avatar size={'sm'} src={user.imageUrl} shadow={'md'} />

                    <Flex direction={'column'} gap={1}>
                        <Tooltip label={`${user.firstName} ${user.lastName}`}>
                            <Text fontSize={'lg'} color={'primary.500'}>
                                {user.firstName}
                            </Text>
                        </Tooltip>
                        {/*<Flex>*/}
                        {/*    <Badge*/}
                        {/*        fontSize={'10'}*/}
                        {/*        fontWeight={'italic'}*/}
                        {/*        textColor={'boxBlue.500'}*/}
                        {/*        backgroundColor={'blue.50'}*/}
                        {/*        border={'1px'}*/}
                        {/*        borderRadius={15}*/}
                        {/*    >*/}
                        {/*        <Text px={1}>{user.team ?? 'N/A team'}</Text>*/}
                        {/*    </Badge>*/}
                        {/*</Flex>*/}
                    </Flex>
                </Flex>

                <Flex w={['100%', '25%']} alignItems={'center'} gap={3}>
                    <Tag
                        size="lg"
                        colorScheme="boxBlue"
                        borderRadius="full"
                        gap={1}
                        w={'60%'}
                        // bgGradient={'linear(to-b, blue.500, yellow.500)'}
                        // bgClip="text"
                    >
                        <Flex textColor={'boxBlue.500'}>
                            <FaBolt size={'20'} />
                        </Flex>
                        <TagLabel w={'100%'}>
                            <Flex w={'100%'}>
                                <Text as="b">{(Math.round(activity.distance * 100) / 100).toFixed(1)}</Text>
                                <Spacer />
                                <Text as="b">km</Text>
                            </Flex>
                        </TagLabel>
                    </Tag>
                    {/*<Text fontSize={'xl'} color={'gray.800'} as='b'>*/}
                    {/*    10.3 km*/}
                    {/*</Text>*/}
                </Flex>

                <Flex w={['100%', '50%']} alignItems={'center'} gap={3}>
                    {/*<Flex w={'40%'} textColor={'primary.500'}>*/}
                    {/*    <CircularProgress value={durationPercentage} color={'boxBlue.500'} size={'55px'}>*/}
                    {/*        <CircularProgressLabel>{displayedDuration}</CircularProgressLabel>*/}
                    {/*    </CircularProgress>*/}
                    {/*</Flex>*/}

                    <Flex w={'100%'} overflow={'hidden'} gap={3}>
                        <Badge
                            variant={'solid'}
                            backgroundColor={'gray.300'}
                            textColor={'gray.800'}
                            alignSelf={'center'}
                            w={'60%'}
                            borderRadius={15}
                            letterSpacing={'.5px'}
                        >
                            <Tooltip label={`${activity.type}`}>
                                <Text px={2} py={1} textOverflow={'ellipsis'} overflow={'hidden'}>
                                    {activity.type}
                                </Text>
                            </Tooltip>
                        </Badge>
                        <Flex
                            fontSize={'xs'}
                            opacity={'0.6'}
                            alignItems={'center'}
                            gap={1}
                            w={'40%'}
                            p={1}
                            textColor={'primary.500'}
                        >
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
