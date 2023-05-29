import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Badge, Flex, Progress, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { HeightRegulator } from '../../utils/generic-components/HeightRegulator';
import { ListItem } from '../../utils/list-item/ListItem';

type Props = {
    userActivity: UserActivity;
    user: User;
    onClick: (activity: UserActivity) => void;
    topScore: number;
};

export const UserActivityListItem = ({ userActivity, user, onClick, topScore }: Props) => {
    return (
        <ListItem>
            <Flex direction={['column', 'row']} w={'100%'} onClick={() => onClick(userActivity)} cursor={'pointer'}>
                {/*copy paste */}
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

                <HeightRegulator />

                <Tooltip label={`score: ${userActivity.score}`}>
                    <Flex w={'50%'} alignItems={'center'} position={'relative'}>
                        <Progress
                            value={userActivity.score}
                            max={topScore}
                            w={'100%'}
                            h={'50%'}
                            rounded={'full'}
                            bgColor={'gray.300'}
                            colorScheme={'boxBlue'}
                            position={'absolute'}
                        ></Progress>
                        <Flex zIndex={999} w={'100%'}>
                            <Spacer />
                            <Text
                                borderColor={'gray.900'}
                                textShadow={'-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}
                                textColor={'gray.50'}
                            >
                                {userActivity.score}
                            </Text>
                            <Spacer />
                        </Flex>
                    </Flex>
                </Tooltip>
            </Flex>
        </ListItem>
    );
};
