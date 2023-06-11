import { Path } from '@box-fc/frontend/domain';
import { useAuthQuery } from '@box-fc/frontend/query';
import { useAuthStore } from '@box-fc/frontend/store';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Flex, IconButton, Menu, MenuButton, MenuList, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { MdBarChart } from 'react-icons/all';
import { FaDumbbell } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { NavigationButton } from '../sidebar/Navigation.button';

export const MobileMenu = () => {
    const { user } = useAuthStore();
    const { isAdmin } = useAuthQuery();
    return (
        <Flex
            bg={'gray.50'}
            backdropFilter="blur(20px)"
            py={2}
            px={2}
            pl={6}
            rounded={'full'}
            alignItems={'center'}
            shadow={'md'}
            position={'absolute'}
            zIndex={999}
            top={0}
            left={0}
            right={0}
            margin={4}
        >
            <Text fontSize={'2xl'} color={'boxBlue.500'} fontWeight={'bold'}>
                Fitness Challenge
            </Text>

            <Spacer />

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    rounded={'full'}
                />
                <MenuList borderRadius={25} p={3}>
                    <NavigationButton path={Path.TRAININGS} icon={FaDumbbell} description={'Trainings'} />

                    <NavigationButton path={Path.STANDINGS} icon={MdBarChart} description={'Standings'} />

                    {isAdmin && <NavigationButton path={Path.TEAMS} icon={MdPeople} description={'[Admin] Teams'} />}
                </MenuList>
            </Menu>

            <Spacer />

            <Tooltip label={`${user.firstName} ${user.lastName}`}>
                <Avatar size={'md'} src={user.imageUrl} shadow={'md'}></Avatar>
            </Tooltip>
        </Flex>
    );
};
