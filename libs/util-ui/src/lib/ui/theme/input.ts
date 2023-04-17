const inputDefaultVariant = () => {
    return {
        field: {
            background: 'gray.100',
            color: 'gray.900',
            _placeholder: {
                color: 'gray.400',
            },
            _hover: {
                background: 'gray.200',
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
