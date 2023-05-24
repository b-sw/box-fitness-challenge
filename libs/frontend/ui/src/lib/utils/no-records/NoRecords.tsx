import { Flex, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';

type Props = {
    message?: string;
};

export const NoRecords = ({ message }: Props) => {
    return (
        <>
            <Spacer />
            <Flex direction={'row'}>
                <Spacer />
                <Flex direction={'column'} align={'center'} p={5} borderRadius={20}>
                    <VscSearchStop opacity={0.5} size={'40'} />
                    <Text opacity={0.5}>{message ?? 'No records'}</Text>
                </Flex>
                <Spacer />
            </Flex>
            <Spacer />
        </>
    );
};
