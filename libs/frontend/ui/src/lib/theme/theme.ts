import { extendTheme } from '@chakra-ui/react';
import { Input } from 'libs/frontend/ui/src/lib/theme/input';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const components = {
    Input,
};

export const theme = extendTheme({ config, components });
