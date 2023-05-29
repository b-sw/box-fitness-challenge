import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const Dashboard = ({ children }: Props) => {
    return (
        <Flex direction={'column'} gap={[2, 5]} p={[0, 5]} alignItems={'center'}>
            {children}
        </Flex>
    );
};
