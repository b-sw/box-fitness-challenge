import { Avatar, Badge, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';

type ProfileMenuRawProps = {
    isEnabled: boolean;
    profilePictureSrc: string;
};

export const ProfileMenuRaw = ({ isEnabled, profilePictureSrc }: ProfileMenuRawProps) => {
    console.log('src', profilePictureSrc);

    return (
        <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} disabled={!isEnabled}>
                <Avatar size={'md'} src={profilePictureSrc} />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <Flex direction={'column'} align={'center'} p={2}>
                    <Avatar size={'xl'} mb={2} src={profilePictureSrc} />
                    <Text fontWeight={'medium'}>Jan Kowalski</Text>
                    <Text fontSize={'sm'} color={'gray.400'}>
                        jkowalski@box.com
                    </Text>

                    <Badge mt={3} colorScheme={'green'} fontSize={'xs'}>
                        Canvas
                    </Badge>
                </Flex>

                <MenuDivider />

                <MenuItem>Settings</MenuItem>
            </MenuList>
        </Menu>
    );
};
