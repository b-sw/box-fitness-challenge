import { Flex, Spacer } from '@chakra-ui/react';
import { ReactElement } from 'react';

type Props = {
    xlWidth: string;
    isMobile: boolean;
    leftChildren: ReactElement | ReactElement[];
    rightChildren: ReactElement | ReactElement[];
};

export const ColonList = ({ leftChildren, rightChildren, xlWidth, isMobile }: Props) => {
    return (
        <Flex w={['100%', xlWidth]}>
            <Flex gap={1} alignItems={'center'} w={'100%'}>
                {isMobile && <Spacer />}
                <Flex direction={'column'} alignItems={'flex-end'}>
                    {leftChildren}
                </Flex>

                <Flex direction={'column'} alignItems={'flex-start'}>
                    {rightChildren}
                </Flex>
                {isMobile && <Spacer />}
            </Flex>
        </Flex>
    );
};
