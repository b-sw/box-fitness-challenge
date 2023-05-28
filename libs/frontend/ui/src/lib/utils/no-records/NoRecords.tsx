import { Flex, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';
import { HeightRegulator } from '../generic-components/HeightRegulator';
import { ListItem } from '../list-item/ListItem';

type Props = {
    message?: string;
};

export const NoRecords = ({ message }: Props) => {
    return (
        <ListItem>
            <HeightRegulator />
            <Spacer />
            <Flex>
                <Spacer />
                <Flex direction={'column'} align={'center'} borderRadius={20}>
                    <VscSearchStop opacity={0.5} size={'25'} />
                    <Text opacity={0.5}>{message ?? 'No records'}</Text>
                </Flex>
                <Spacer />
            </Flex>
            <Spacer />
        </ListItem>
    );
};
