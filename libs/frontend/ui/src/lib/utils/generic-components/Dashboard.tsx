import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Dashboard = ({ children }: Props) => {
    return (
        <Flex direction={'column'} alignItems={'center'}>
            {children}
        </Flex>
    );
};
