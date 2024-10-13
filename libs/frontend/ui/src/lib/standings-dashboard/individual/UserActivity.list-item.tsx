import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Flex, Progress, Spacer, Text, Tooltip } from '@chakra-ui/react';
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
                    <Avatar size={'sm'} src={user.imageUrl} shadow={'md'} />

                    <Flex direction={'column'} gap={1}>
                        <Tooltip label={`${user.firstName} ${user.lastName}`}>
                            <Text fontSize={'lg'} color={'primary.500'}>
                                {user.firstName}
                            </Text>
                        </Tooltip>
                    </Flex>
                </Flex>

                <Tooltip label={`score: ${userActivity.score}`}>
                    <Flex w={'100%'} alignItems={'center'} position={'relative'}>
                        <Progress
                            value={userActivity.score}
                            max={topScore}
                            w={'100%'}
                            h={'75%'}
                            rounded={'full'}
                            borderRadius={'full'}
                            bgColor={'white'}
                            colorScheme={'customYellow'}
                            position={'absolute'}
                        ></Progress>
                        <Flex zIndex={999} w={'100%'}>
                            <Spacer />
                            <Text
                                borderColor={'gray.900'}
                                // textShadow={'-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}
                                textColor={'gray.700'}
                                as="b"
                                fontSize={14}
                            >
                                {userActivity.score} km
                            </Text>
                            <Spacer />
                        </Flex>
                    </Flex>
                </Tooltip>
            </Flex>
        </ListItem>
    );
};
