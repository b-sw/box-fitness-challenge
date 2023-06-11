import { Path } from '@box-fc/frontend/domain';
import { useAuthMutation, useAuthQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { Avatar, Badge, Button, Divider, Flex, Icon, IconButton, Spacer, Text } from '@chakra-ui/react';
import { FaTrophy, MdBarChart, MdLogout } from 'react-icons/all';
import { FaDumbbell } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { NavigationButton } from './Navigation.button';

export const Sidebar = () => {
    const { user } = useAuthStore();
    const { isAdmin } = useAuthQuery();
    const { logout } = useAuthMutation({});

    return (
        <Flex direction={'column'} w={'500px'} backgroundColor={'gray.50'} borderRadius={25} shadow={'md'} p={5} m={5}>
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
                {/*<NavigationButton path={Path.WINNERS} icon={FaTrophy} description={'Winners'} />*/}
                {isAdmin && <NavigationButton path={Path.TEAMS} icon={MdPeople} description={'[Admin] Teams'} />}

                <Flex alignItems={'center'}>
                    <Button
                        variant={'link'}
                        outline="none"
                        _focus={{ boxShadow: 'none' }}
                        _active={{ boxShadow: 'none' }}
                        _hover={{ textDecoration: 'none' }}
                        size={'lg'}
                        disabled
                    >
                        <Flex w={'100%'} pl={5} alignItems={'center'} gap={2}>
                            <Icon as={FaTrophy} color={'gray.400'} />
                            <Text color={'gray.400'} fontWeight={'normal'} fontSize={'2xl'}>
                                Winners
                            </Text>
                            <Spacer />
                        </Flex>
                    </Button>

                    <Badge
                        fontSize={'10'}
                        textColor={'boxBlue.500'}
                        backgroundColor={'blue.50'}
                        border={'1px'}
                        borderRadius={15}
                    >
                        <Text px={1}>Soon</Text>
                    </Badge>
                </Flex>
            </Flex>

            <Spacer />

            <Flex gap={2} alignItems={'center'}>
                <Avatar size={'lg'} src={user.imageUrl} shadow={'md'} />
                <Flex direction={'column'}>
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={'lg'}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </Flex>
                    <Flex>
                        <Badge
                            fontSize={'10'}
                            fontWeight={'italic'}
                            textColor={'boxBlue.500'}
                            backgroundColor={'blue.50'}
                            border={'1px'}
                            borderRadius={15}
                        >
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
                <IconButton
                    aria-label={'logout'}
                    variant={'ghost'}
                    icon={<MdLogout />}
                    onClick={logout}
                    rounded={'full'}
                />
            </Flex>
        </Flex>
    );
};
