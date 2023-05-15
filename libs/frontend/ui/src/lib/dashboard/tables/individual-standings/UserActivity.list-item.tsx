import { User, UserActivity } from '@box-fc/shared/types';
import { Avatar, Badge, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { MdAssessment } from 'react-icons/md';
import { ListItem } from '../../../utils/list-item/ListItem';

type Props = {
    userActivity: UserActivity;
    user: User;
    onClick: (activity: UserActivity) => void;
    isMobile: boolean;
};

export const UserActivityListItem = ({ userActivity, user, onClick, isMobile }: Props) => {
    return (
        <ListItem>
            <Flex direction={['column', 'row']} w={'100%'}>
                <Flex w={['100%', '70%']} gap={1} alignItems={'center'}>
                    <Avatar size={'md'} src={user.imageUrl} />
                    <Flex direction={'column'}>
                        <Flex alignItems={'center'} gap={1}>
                            <Text fontSize={'lg'}>
                                {user.firstName} {user.lastName}
                            </Text>
                        </Flex>
                        <Flex>
                            <Badge colorScheme="linkedin" fontSize={'xs'} variant={'subtle'}>
                                {user.team ?? 'N/A team'}
                            </Badge>
                        </Flex>
                        <Flex direction={'column'}>
                            <Text fontSize={'sm'} color={'gray.400'}>
                                {user.email}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w={['100%', '20%']} direction={['column', 'row']}>
                    <Flex w={['100%', '75%']} gap={1} alignItems={'center'}>
                        {isMobile && <Spacer />}

                        <Text fontSize={'sm'} color={'gray.800'}>
                            Score:
                        </Text>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {userActivity.score}
                        </Text>

                        {isMobile && <Spacer />}
                    </Flex>
                </Flex>

                <Spacer />

                <Flex w={['100%', '10%']} direction={['column', 'row']} alignItems={'center'}>
                    <IconButton
                        aria-label="user-activity-button"
                        icon={<MdAssessment />}
                        variant={'ghost'}
                        onClick={() => onClick(userActivity)}
                    />
                </Flex>
            </Flex>
        </ListItem>
    );
};
