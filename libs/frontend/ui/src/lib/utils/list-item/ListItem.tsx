import { Flex } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const ListItem = ({ children }: Props) => {
    return (
        <Flex
            direction={['column', 'row']}
            p={3}
            borderRadius={10}
            alignItems={'center'}
            backgroundColor={'gray.50'}
            gap={[1, 0]}
        >
            {children}
        </Flex>
    );
};
