import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

export enum SwitchDirection {
    LEFT = 'left',
    RIGHT = 'right',
}

type Props = {
    activeListing: string;
    switchListing: (direction: SwitchDirection) => void;
    size?: 'sm' | 'lg';
    isLoadingLeft?: boolean;
    isLoadingRight?: boolean;
};

export const ListingSwitcher = ({ activeListing, switchListing, size, isLoadingLeft, isLoadingRight }: Props) => {
    const buttonSize = size ?? 'md';
    const textSize = size === 'sm' ? '2xl' : '4xl';

    const iconButton = (icon: ReactElement, direction: SwitchDirection) => (
        <IconButton
            aria-label={'listing-icon'}
            icon={icon}
            onClick={() => switchListing(direction)}
            rounded={'full'}
            size={buttonSize}
            backgroundColor={'primary.50'}
            shadow={'md'}
            isLoading={direction === SwitchDirection.LEFT ? isLoadingLeft : isLoadingRight}
        />
    );

    return (
        <Flex alignItems={'center'} w={['90%', '500px']}>
            <Flex>
                <Spacer />
                {iconButton(<ArrowBackIcon />, SwitchDirection.LEFT)}
            </Flex>
            <Spacer />

            <Flex w={size === 'sm' ? '50%' : '80%'}>
                <Spacer />
                <Text fontSize={['2xl', textSize]} fontWeight={'bold'} color={'gray.50'}>
                    {activeListing}
                </Text>
                <Spacer />
            </Flex>

            <Spacer />
            <Flex>
                {iconButton(<ArrowForwardIcon />, SwitchDirection.RIGHT)}
                <Spacer />
            </Flex>
        </Flex>
    );
};
