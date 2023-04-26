const defaultModalVariant = () => {
    return {
        dialog: {
            bg: 'gray.300',
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
        variant: 'defaultModal',
    },
};
