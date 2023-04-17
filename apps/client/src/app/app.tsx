import { TablesDashboard } from '@box-fc/ui-tables';
import { theme } from '@box-fc/util-ui';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <TablesDashboard />
        </ChakraProvider>
    );
};
