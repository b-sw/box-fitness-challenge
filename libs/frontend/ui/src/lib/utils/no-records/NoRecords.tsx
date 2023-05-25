import { Badge, Flex, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';

type Props = {
    message?: string;
};

export const NoRecords = ({ message }: Props) => {
    const heightRegulator = (
        <Flex direction={'column'} w={'0%'} visibility={'hidden'}>
            <Badge>
                <Text p={1}>a</Text>
            </Badge>
            <Flex fontSize={'xs'} p={1}>
                <Text>a</Text>
            </Flex>
        </Flex>
    );

    return (
        <Flex p={4} alignItems={'center'}>
            {heightRegulator}
            <Spacer />
            <Flex direction={'row'}>
                <Spacer />
                <Flex direction={'column'} align={'center'} borderRadius={20}>
                    <VscSearchStop opacity={0.5} size={'25'} />
                    <Text opacity={0.5}>{message ?? 'No records'}</Text>
                </Flex>
                <Spacer />
            </Flex>
            <Spacer />
        </Flex>
    );
};
