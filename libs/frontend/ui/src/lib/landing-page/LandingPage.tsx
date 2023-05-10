import { Flex, Spacer } from '@chakra-ui/react';
import { Page } from '../utils/page/Page';
import { LoginButton } from './LoginButton';

export const LandingPage = () => {
    return (
        <Page>
            <Flex alignItems={'center'} h={'100vh'}>
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
