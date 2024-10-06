import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

export const Page = ({ children }: Props) => {
    return (
        <Flex
            h={'100vh'}
            w={'100vw'}
            direction={'column'}
            overflow={'hidden'}
            backgroundColor={'gray.200'}
            position={['relative', 'static']}
        >
            {children}
        </Flex>
    );
};
