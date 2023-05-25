import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: FlexProps;
};

export const ListItem = ({ children, options }: Props) => {
    return (
        <Flex
            direction={['column', 'row']}
            p={4}
            alignItems={'center'}
            backgroundColor={'gray.50'}
            gap={[1, 0]}
            {...options}
            borderBottom={'1px solid #ebebeb'}
            _hover={{ boxShadow: 'lg', zIndex: 999 }}
        >
            {children}
        </Flex>
    );
};
