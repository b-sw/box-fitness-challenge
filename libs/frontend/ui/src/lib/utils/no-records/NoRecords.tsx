import { CircularProgress, Flex, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';
import { ListItem } from '../list-item/ListItem';

type Props = {
    message?: string;
};

export const NoRecords = ({ message }: Props) => {
    const HEIGHT_REGULATOR = <CircularProgress size={'55px'} visibility={'hidden'} w={'0%'} />;

    return (
        <ListItem>
            {HEIGHT_REGULATOR}
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
