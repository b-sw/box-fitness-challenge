import { ListItem } from '@box-fc/frontend/ui';
import { User } from '@box-fc/shared/types';
import { Avatar, Badge, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HeightRegulator } from '../utils/generic-components/HeightRegulator';

type Props = {
    user: User;
    onClick: (user: User) => void;
    button?: ReactNode;
};

export const UserListItem = ({ user, onClick, button }: Props) => {
    return (
        <ListItem key={`user-list-item-${user.id}`} options={{ onClick: () => onClick(user), cursor: 'pointer' }}>
            <HeightRegulator />
            <Flex direction={'row'} w={'100%'}>
                <Flex w={'70%'} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} src={user.imageUrl} shadow={'md'} />

                    <Flex direction={'column'} gap={1}>
                        <Tooltip label={`${user.email}`}>
                            <Text fontSize={'lg'}>
                                {user.firstName} {user.lastName}
                            </Text>
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

                <Spacer />

                <Flex alignItems={'center'}>{button}</Flex>
            </Flex>
        </ListItem>
    );
};
