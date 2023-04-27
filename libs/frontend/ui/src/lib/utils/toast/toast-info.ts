export const toastSuccess = (toast: any, successMessage: string) => {
    toast({
        title: successMessage,
        ...defaultToastSuccessOptions,
    });
};

export const toastError = (toast: any, errorMessage: string) => {
    toast({
        title: errorMessage,
        ...defaultToastErrorOptions,
    });
};

export const defaultToastErrorOptions = {
    status: 'error',
    position: 'bottom-right',
    duration: 2000,
} as any;

export const defaultToastSuccessOptions = {
    status: 'success',
    position: 'bottom-right',
    duration: 2000,
} as any;
