import { Tab, TabIndicator, TabList } from '@chakra-ui/react';
import { TabText } from './TabText';

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

    return (
        <>
            <TabList>
                <Tab _focus={{ boxShadow: 'none' }}>
                    <TabText text={'My activities'} size={textSize} />
                </Tab>
                <Tab _focus={{ boxShadow: 'none' }}>
                    <TabText text={'Boxers activities'} size={textSize} />
                </Tab>
            </TabList>
            <TabIndicator height="2px" bg="boxBlue.500" borderRadius="1px" />
        </>
    );
};
