import { Flex, Spacer, Text } from '@chakra-ui/react';

type HeaderPanelProps = {
    title: string;
    loginButton: JSX.Element;
    activityButton: JSX.Element;
    profileMenu: JSX.Element;
};

export const HeaderRaw = ({ title, loginButton, activityButton, profileMenu }: HeaderPanelProps) => {
    return (
        <Flex direction={['column', 'row']} backgroundColor={'blue.600'} mb={3}>
            <Text fontSize={'4xl'} color={'gray.50'} fontWeight={'bold'}>
                {title}
            </Text>

            <Spacer />

            <Flex alignItems={'center'} gap={2}>
                {loginButton}
                {activityButton}
                {profileMenu}
            </Flex>
        </Flex>
    );
};
