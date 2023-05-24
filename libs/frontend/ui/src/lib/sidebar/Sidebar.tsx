import { Path } from '@box-fc/frontend/domain';
import { useAuthMutation } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { Avatar, Badge, Divider, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { FaTrophy, MdBarChart, MdLogout } from 'react-icons/all';
import { FaDumbbell } from 'react-icons/fa';
import { NavigationButton } from './Navigation.button';

export const Sidebar = () => {
    const { user } = useAuthStore();
    const { logout } = useAuthMutation({});

    return (
        <Flex direction={'column'} w={'350px'} backgroundColor={'gray.50'} borderRadius={25} shadow={'md'} mr={5} p={5}>
            <Flex>
                <Spacer />
                <Text fontSize={'3xl'} color={'boxBlue.500'} fontWeight={'bold'}>
                    Fitness Challenge
                </Text>
                <Spacer />
            </Flex>

            <Divider style={{ borderWidth: '2px' }} my={5} />

            <Flex direction={'column'} gap={5}>
                <NavigationButton path={Path.TRAININGS} icon={FaDumbbell} description={'Trainings'} />
                <NavigationButton path={Path.STANDINGS} icon={MdBarChart} description={'Standings'} />
                <NavigationButton path={Path.WINNERS} icon={FaTrophy} description={'Winners'} />
            </Flex>

            <Spacer />

            <Flex gap={2} alignItems={'center'}>
                <Avatar size={'lg'} src={user.imageUrl} />
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

                <Spacer />
                <IconButton aria-label={'logout'} variant={'ghost'} icon={<MdLogout />} onClick={logout} />
            </Flex>
        </Flex>
    );
};
