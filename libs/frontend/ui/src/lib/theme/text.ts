const textDefaultVariant = () => {
    return {
        color: 'primary.500',
    };
};

export const Text = {
    variants: {
        defaultText: textDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultText',
    },
};
