import { Flex, Spacer } from '@chakra-ui/react';
import { LoginButton } from '../header/LoginButton';
import { Page } from '../utils/page/Page';

export const LandingPage = () => {
    return (
        <Page>
            <Flex alignItems={'center'} h={'100%'}>
                <Spacer />

                <Flex direction={'column'} alignItems={'center'}>
                    <Spacer />

                    <LoginButton />

                    <Spacer />
                </Flex>

                <Spacer />
            </Flex>
        </Page>
    );
};
