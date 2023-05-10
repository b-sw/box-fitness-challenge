import { TabPanels as ChakraTabPanels } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const TabPanels = ({ children }: Props) => {
    return (
        <ChakraTabPanels overflowY={'scroll'} h={'100%'}>
            {children}
        </ChakraTabPanels>
    );
};
