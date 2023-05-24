const inputDefaultVariant = () => {
    return {
        field: {
            background: 'gray.50',
            color: 'gray.900',
            _placeholder: {
                color: 'gray.400',
            },
            _hover: {
                background: 'gray.100',
            },
            _focus: {
                background: 'gray.50',
            },
        },
    };
};

export const Input = {
    variants: {
        defaultInput: inputDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultInput',
    },
};
