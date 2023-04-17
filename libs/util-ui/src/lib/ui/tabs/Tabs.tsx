import { Tabs as ChakraTabs, TabsProps as ChakraTabsProps } from '@chakra-ui/react';

type TabsProps = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: ChakraTabsProps;
};

export const Tabs = ({ children, options }: TabsProps) => {
    return (
        <ChakraTabs
            display={'flex'}
            flexDirection={'column'}
            isFitted
            overflowY={'hidden'}
            colorScheme={'tabsButton'}
            h={'100%'}
            {...options}
        >
            {children}
        </ChakraTabs>
    );
};
