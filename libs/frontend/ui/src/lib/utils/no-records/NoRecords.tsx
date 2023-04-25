import { Flex, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';

export const NoRecords = (message: string) => {
    return (
        <>
            <Spacer />
            <Flex direction={'row'}>
                <Spacer />
                <Flex direction={'column'} align={'center'} p={5} borderRadius={10}>
                    <VscSearchStop opacity={0.5} size={'40'} />
                    <Text opacity={0.5}>{message}</Text>
                </Flex>
                <Spacer />
            </Flex>
            <Spacer />
        </>
    );
};
