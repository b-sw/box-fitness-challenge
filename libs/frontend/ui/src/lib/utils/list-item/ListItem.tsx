import { Flex } from '@chakra-ui/react';

type PageProps = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const ListItem = ({ children }: PageProps) => {
    return (
        <Flex direction={['column', 'row']} p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
            {children}
        </Flex>
    );
};
