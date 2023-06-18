import { Week } from '@box-fc/frontend/domain';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useSetState } from '../hooks';
import { getWeek } from '../utils/datetime/week';
import { WeekDashboard } from '../utils/generic-components/Week.dashboard';
import { WinnersTableWrapper } from './Winners.table-wrapper';

enum Listing {
    INDIVIDUAL = 'Individual winners',
}

type State = {
    week: Week;
};

export const WinnersDashboard = () => {
    const [{ week }, setState] = useSetState<State>({ week: getWeek(dayjs()) });

    return (
        <WeekDashboard week={week} setWeek={(newWeek) => setState({ week: newWeek })}>
            <Flex alignItems={'center'} w={['90%', '500px']} p={5}>
                <Spacer />
                <Text fontSize={'4xl'} fontWeight={'bold'} color={'gray.700'}>
                    {Listing.INDIVIDUAL}
                </Text>
                <Spacer />
            </Flex>

            <WinnersTableWrapper week={week} />
        </WeekDashboard>
    );
};
