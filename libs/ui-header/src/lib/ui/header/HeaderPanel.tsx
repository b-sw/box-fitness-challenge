import {
    Avatar,
    Badge,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';

type HeaderPanelProps = {
    title: string;
};

export const HeaderPanel = ({ title }: HeaderPanelProps) => {
    // TODO: export menu to separate component

    return (
        <Flex direction={['column', 'row']} backgroundColor={'blue.600'} mb={3}>
            <Text fontSize={'4xl'} color={'gray.50'} fontWeight={'bold'}>
                {title}
            </Text>

            <Spacer />

            <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                    <Avatar size={'md'} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <Flex direction={'column'} align={'center'} p={2}>
                        <Avatar size={'xl'} mb={2} />
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
        </Flex>
    );
};
