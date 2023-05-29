import { Flex, Spacer } from '@chakra-ui/react';
import { Page } from '../utils/page/Page';
import { LoginButton } from './LoginButton';

export const LandingPage = () => {
    return (
        <Page>
            <Flex direction={['column', 'row']} alignItems={'center'} w={'100vw'} h={'100vh'}>
                <Spacer />

                <Flex direction={'row'} alignItems={'center'}>
                    <Spacer />

                    <LoginButton />

                    <Spacer />
                </Flex>

                <Spacer />
            </Flex>
        </Page>
    );
};
