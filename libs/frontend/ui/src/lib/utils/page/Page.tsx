import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

export const Page = ({ children }: Props) => {
    return (
        <Flex
            p={[1, 4]}
            h={'100vh'}
            w={'100vw'}
            direction={['column', 'row']}
            overflow={'hidden'}
            backgroundColor={'gray.200'}
            position={['relative', 'static']}
        >
            {children}
        </Flex>
    );
};
