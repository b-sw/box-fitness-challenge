import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: FlexProps;
};

export const TablePanel = ({ children, options }: Props) => {
    return (
        <Flex direction={'column'} w={'600px'} overflow={'hidden'} flexGrow={1} {...options}>
            <Flex
                direction={'column'}
                borderRadius={20}
                p={5}
                shadow={'md'}
                overflow={'hidden'}
                flexGrow={1}
                w={'100%'}
                maxH={['90vh', '100%']}
            >
                {children}
            </Flex>
        </Flex>
    );
};
