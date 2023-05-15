import { Avatar, Badge, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';

type Props = {
    isEnabled: boolean;
    firstName: string;
    lastName: string;
    email: string;
    team: string;
    division: string;
    profilePictureSrc: string;
    handleLogout: () => void;
};

export const ProfileMenuRaw = ({
    isEnabled,
    firstName,
    lastName,
    email,
    team,
    division,
    profilePictureSrc,
    handleLogout,
}: Props) => {
    return (
        <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} disabled={!isEnabled}>
                <Avatar size={'md'} src={profilePictureSrc} />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <Flex direction={'column'} align={'center'} p={2}>
                    <Avatar size={'xl'} mb={2} src={profilePictureSrc} />
                    <Text fontWeight={'medium'}>
                        {firstName} {lastName}
                    </Text>
                    <Text fontSize={'sm'} color={'gray.400'}>
                        {email}
                    </Text>

                    <Flex mt={3} gap={2} direction={'column'}>
                        <Badge colorScheme={'linkedin'} fontSize={'xs'}>
                            {team}
                        </Badge>
                        <Badge colorScheme={'gray'} fontSize={'xs'}>
                            {division}
                        </Badge>
                    </Flex>
                </Flex>

                <MenuDivider />

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};
