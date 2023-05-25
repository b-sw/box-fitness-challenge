const tooltipDefaultVariant = () => {
    return {
        rounded: 'full',
        letterSpacing: '.5px',
        px: 3,
    };
};

export const Tooltip = {
    variants: {
        defaultTooltip: tooltipDefaultVariant,
    },
    defaultProps: {
        variant: 'defaultTooltip',
    },
};
