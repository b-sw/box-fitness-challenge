import { extendTheme } from '@chakra-ui/react';
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
    Input,
    Modal,
    Tooltip,
    Button,
};

export const theme = extendTheme({ config, components, colors });
