const buttonDefaultVariant = () => {
    return {
        backgroundColor: 'primary.50',
        rounded: 'full',
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
