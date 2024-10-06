import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/inter';
import { Button } from './button';
import { colors } from './colors';
import { Input } from './input';
import { Modal } from './modal';
import { Tooltip } from './tooltip';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const components = {
    // Text,
    Input,
    Modal,
    Tooltip,
    Button,
};

export const theme = extendTheme({
    config,
    components,
    colors,
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
});
