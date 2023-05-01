import { Flex, Spinner } from '@chakra-ui/react';
import { Page } from '../page/Page';

export const LoadingOverlay = () => {
    return (
        <Page>
            <Flex flexGrow={1} flexDirection={'column'} justifyContent={'center'}>
                <Flex justifyContent={'center'}>
                    <Spinner size="xl" />
                </Flex>
            </Flex>
        </Page>
    );
};
