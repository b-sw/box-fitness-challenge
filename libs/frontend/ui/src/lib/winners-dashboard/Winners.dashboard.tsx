import { Week, WEEKS } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getWeek } from '../utils/datetime/week';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { ListingSwitcher, SwitchDirection } from '../utils/generic-components/listing-switcher/ListingSwitcher';
import { WinnersTableWrapper } from './Winners.table-wrapper';

enum Listing {
    INDIVIDUAL = 'Individual winners',
}

export const WinnersDashboard = () => {
    const [activeWeek, setActiveWeek] = useState<Week>(getWeek(dayjs()));
    const [winnersWeek, setWinnersWeek] = useState<Week>(getWeek(dayjs()));
    const [isLoadingLeft, setIsLoadingLeft] = useState<boolean>(false);
    const [isLoadingRight, setIsLoadingRight] = useState<boolean>(false);
    const { usersActivitiesAreLoading } = useActivitiesQuery({ ...activeWeek });

    useEffect(() => {
        if (!usersActivitiesAreLoading) {
            setIsLoadingLeft(false);
            setIsLoadingRight(false);

            setWinnersWeek(activeWeek);
        }
    }, [activeWeek, usersActivitiesAreLoading]);

    const switchWeek = (direction: SwitchDirection) => {
        setActiveWeek((oldWeek) => {
            const weeksIds = [...WEEKS.keys()];
            const oldWeekId = weeksIds.indexOf(oldWeek.id);
            const shift = direction === SwitchDirection.LEFT ? -1 : 1;
            const newWeekId = weeksIds[(((oldWeekId + shift) % 5) + 5) % 5];

            return WEEKS.get(newWeekId) as Week;
        });

        if (direction === SwitchDirection.LEFT) {
            setIsLoadingLeft(true);
        } else {
            setIsLoadingRight(true);
        }
    };

    return (
        <Dashboard>
            <Flex alignItems={'center'} w={['90%', '500px']} p={5}>
                <Spacer />
                <Text fontSize={'4xl'} fontWeight={'bold'} color={'gray.700'}>
                    {Listing.INDIVIDUAL}
                </Text>
                <Spacer />
            </Flex>

            <WinnersTableWrapper week={winnersWeek} />

            <ListingSwitcher
                activeListing={`Week ${activeWeek.id}`}
                switchListing={switchWeek}
                size={'sm'}
                isLoadingLeft={isLoadingLeft}
                isLoadingRight={isLoadingRight}
            />
        </Dashboard>
    );
};
