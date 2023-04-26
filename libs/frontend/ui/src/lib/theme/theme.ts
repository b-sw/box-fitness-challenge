import { extendTheme } from '@chakra-ui/react';
import { Input } from './input';
import { Modal } from './modal';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const components = {
    Input,
    Modal,
};

export const theme = extendTheme({ config, components });
