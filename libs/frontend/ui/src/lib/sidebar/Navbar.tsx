import { Path } from '@box-fc/frontend/domain';
import { useAuthMutation, useAuthQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { Avatar, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { MdBarChart, MdLogout } from 'react-icons/all';
import { FaDumbbell } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { NavigationButton } from './Navigation.button';

export const Navbar = () => {
    const { user } = useAuthStore();
    const { isAdmin } = useAuthQuery();
    const { logout } = useAuthMutation({});

    return (
        <Flex w={'full'} backgroundColor={'gray.50'} shadow={'md'} p={2} alignItems={'center'}>
            <Flex mx={2} fontSize={'3xl'} fontWeight={'bold'} gap={2}>
                <Text color="customYellow.500">MOVE</Text>
                <Text color="customBlue.500">FOR</Text>
                <Text color="customBlue.500">UKRAINE</Text>
            </Flex>

            <Spacer />

            <Flex gap={5}>
                <NavigationButton path={Path.ACTIVITIES} icon={FaDumbbell} description={'Activities'} />
                <NavigationButton path={Path.STANDINGS} icon={MdBarChart} description={'Standings'} />
                {/*<NavigationButton path={Path.WINNERS} icon={FaTrophy} description={'Winners'} />*/}
                {isAdmin && <NavigationButton path={Path.TEAMS} icon={MdPeople} description={'[Admin] Teams'} />}
            </Flex>

            <Spacer />

            <Flex gap={2} alignItems={'center'}>
                <Avatar size={'md'} src={user.imageUrl} shadow={'md'} />
                <Flex direction={'column'}>
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={'lg'} color={'primary.500'}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </Flex>
                    {/*<Flex>*/}
                    {/*    <Badge*/}
                    {/*        fontSize={'10'}*/}
                    {/*        fontWeight={'italic'}*/}
                    {/*        textColor={'boxBlue.500'}*/}
                    {/*        backgroundColor={'blue.50'}*/}
                    {/*        border={'1px'}*/}
                    {/*        borderRadius={15}*/}
                    {/*    >*/}
                    {/*        {user.team ?? 'N/A team'}*/}
                    {/*    </Badge>*/}
                    {/*</Flex>*/}
                    <Flex direction={'column'}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            {user.email}
                        </Text>
                    </Flex>
                </Flex>

                <Spacer />
                <IconButton
                    textColor={'primary.500'}
                    aria-label={'logout'}
                    variant={'ghost'}
                    icon={<MdLogout />}
                    onClick={logout}
                    rounded={'full'}
                    _hover={{ backgroundColor: 'gray.100' }}
                />
            </Flex>
        </Flex>
    );
};
