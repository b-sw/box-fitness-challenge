import { Dashboard, theme } from '@box-fc/frontend/ui';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <GoogleOAuthProvider clientId="490068188431-eic0p1h0qb5jvg9m3n04esbu4dlevrl8.apps.googleusercontent.com">
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Dashboard />
                </QueryClientProvider>
            </ChakraProvider>
        </GoogleOAuthProvider>
    );
};
