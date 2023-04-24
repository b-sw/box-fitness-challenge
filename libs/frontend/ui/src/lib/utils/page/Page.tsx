import { Flex } from '@chakra-ui/react';

type PageProps = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const Page = ({ children }: PageProps) => {
    return (
        <Flex p={[2, 4]} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'blue.600'}>
            {children}
        </Flex>
    );
};
