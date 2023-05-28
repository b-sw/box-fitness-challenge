const defaultModalVariant = () => {
    return {
        dialog: {
            bg: 'gray.300',
            shadow: 'none',
        },
        overlay: {
            backdropFilter: 'auto',
            backdropBlur: '5px',
        },
    };
};

export const Modal = {
    variants: {
        defaultModal: defaultModalVariant,
    },
    defaultProps: {
        size: 'md',
        variant: 'defaultModal',
    },
};
