import { Text } from '@chakra-ui/react';

type Props = {
    text: string;
    size: string;
};

export const TabText = ({ text, size }: Props) => {
    return (
        <Text fontSize={['2xl', size]} fontWeight={'bold'} color={'gray.700'}>
            {text}
        </Text>
    );
};
