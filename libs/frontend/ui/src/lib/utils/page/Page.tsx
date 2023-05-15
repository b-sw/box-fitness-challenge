import { Flex } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
};

export const Page = ({ children }: Props) => {
    return (
        <Flex p={[2, 4]} h={['auto', '100vh']} direction={'column'} overflow={'hidden'} backgroundColor={'boxBlue.500'}>
            {children}
        </Flex>
    );
};
