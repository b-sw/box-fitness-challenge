import { TabPanels as ChakraTabPanels } from '@chakra-ui/react';

type TabPanelsProps = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const TabPanels = ({ children }: TabPanelsProps) => {
    return (
        <ChakraTabPanels overflowY={'scroll'} h={'100%'}>
            {children}
        </ChakraTabPanels>
    );
};
