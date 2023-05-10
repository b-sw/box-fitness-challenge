import { Tabs as ChakraTabs, TabsProps } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: TabsProps;
};

export const Tabs = ({ children, options }: Props) => {
    return (
        <ChakraTabs
            display={'flex'}
            flexDirection={'column'}
            isFitted
            overflowY={'hidden'}
            colorScheme={'tabsButton'}
            h={'100%'}
            {...options}
        >
            {children}
        </ChakraTabs>
    );
};
