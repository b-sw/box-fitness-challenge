import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Badge, Flex, Progress, Text, Tooltip } from '@chakra-ui/react';
import { ListItem } from '../utils/list-item/ListItem';

type Props = {
    userActivity: UserActivity;
    user: User;
    onClick: (activity: UserActivity) => void;
    topScore: number;
};

export const UserActivityListItem = ({ userActivity, user, onClick, topScore }: Props) => {
    return (
        <ListItem>
            <Flex direction={['column', 'row']} w={'100%'}>
                {/*copy paste */}
                <Flex w={['100%', '60%']} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} src={user.imageUrl} />

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

                <Tooltip label={userActivity.score}>
                    <Flex w={'40%'} alignItems={'center'}>
                        <Progress
                            value={userActivity.score}
                            max={topScore}
                            w={'100%'}
                            h={'50%'}
                            rounded={'full'}
                            backgroundColor={'gray.200'}
                        >
                            <Text>{userActivity.score}</Text>
                        </Progress>
                    </Flex>
                </Tooltip>
            </Flex>
        </ListItem>
    );
};
