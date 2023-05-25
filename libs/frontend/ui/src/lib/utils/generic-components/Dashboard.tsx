import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Dashboard = ({ children }: Props) => {
    return (
        <Flex direction={'column'} gap={5} p={5} alignItems={'center'}>
            {children}
        </Flex>
    );
};
