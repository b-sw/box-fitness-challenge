import { Week, WEEKS } from '@box-fc/frontend/domain';
import { useUsersQuery } from '@box-fc/frontend/query';
import { switchCase } from '@box-fc/shared/util';
import { Spacer } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { getWeek } from '../utils/datetime/week';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { ListingSwitcher, SwitchDirection } from '../utils/generic-components/listing-switcher/ListingSwitcher';
import { IndividualStandingsTable } from './IndividualStandings.table';
import { TeamsStandingsTable } from './TeamsStandings.table';

enum Listing {
    INDIVIDUAL = 'Individual standings',
    TEAMS = 'Teams standings',
}

export const StandingsDashboard = () => {
    const [activeStandings, setActiveStandings] = useState<Listing>(Listing.INDIVIDUAL);
    const [activeWeek, setActiveWeek] = useState<Week>(getWeek(dayjs()));
    const { users } = useUsersQuery();

    const switchStandings = () => {
        if (activeStandings === Listing.INDIVIDUAL) {
            setActiveStandings(Listing.TEAMS);
        } else {
            setActiveStandings(Listing.INDIVIDUAL);
        }
    };

    const switchWeek = (direction: SwitchDirection) => {
        setActiveWeek((oldWeek) => {
            const weeksIds = [...WEEKS.keys()];
            const oldWeekId = weeksIds.indexOf(oldWeek.id);
            const shift = direction === SwitchDirection.LEFT ? -1 : 1;
            const newWeekId = weeksIds[(((oldWeekId + shift) % 5) + 5) % 5];

            return WEEKS.get(newWeekId) as Week;
        });
    };

    const getStandings = (): ReactNode => {
        return switchCase({
            [Listing.INDIVIDUAL]: <IndividualStandingsTable week={activeWeek} users={users} />,
            [Listing.TEAMS]: <TeamsStandingsTable week={activeWeek} />,
        })(activeStandings);
    };

    return (
        <Dashboard>
            <ListingSwitcher activeListing={activeStandings} switchListing={switchStandings} />

            <Spacer />

            {getStandings()}

            <Spacer />

            <ListingSwitcher activeListing={`Week ${activeWeek.id}`} switchListing={switchWeek} size={'sm'} />
        </Dashboard>
    );
};
