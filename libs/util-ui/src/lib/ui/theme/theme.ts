import { extendTheme } from '@chakra-ui/react';
import { Input } from './input';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const components = {
    Input,
};

export const theme = extendTheme({ config, components });
