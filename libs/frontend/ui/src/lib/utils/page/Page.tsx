import { Flex } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const Page = ({ children }: Props) => {
    return (
        <Flex
            p={[1, 4]}
            h={'100vh'}
            w={'100vw'}
            direction={['column', 'row']}
            overflow={'hidden'}
            backgroundColor={'boxBlue.500'}
            position={['relative', 'static']}
        >
            {children}
        </Flex>
    );
};
