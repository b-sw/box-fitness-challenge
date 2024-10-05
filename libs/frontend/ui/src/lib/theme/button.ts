const buttonDefaultVariant = () => {
    return {
        backgroundColor: 'primary.50',
        textColor: 'primary.500',
        rounded: 'full',
        shadow: 'md',
    };
};

export const Button = {
    variants: {
        defaultButton: buttonDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultButton',
    },
};
