import { useMobileQuery } from '@box-fc/frontend/query';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

type Props = {
    title: string;
    buttons: ReactElement;
};

export const HeaderRaw = ({ title, buttons }: Props) => {
    const { isMobile } = useMobileQuery();

    return (
        <Flex direction={['column', 'row']} backgroundColor={'blue.600'} mb={3}>
            <Flex>
                {isMobile && <Spacer />}
                <Text fontSize={'4xl'} color={'gray.50'} fontWeight={'bold'}>
                    {title}
                </Text>
                {isMobile && <Spacer />}
            </Flex>

            <Spacer />

            <Flex alignItems={'center'} gap={2}>
                <Spacer />
                {buttons}
                <Spacer />
            </Flex>
        </Flex>
    );
};
