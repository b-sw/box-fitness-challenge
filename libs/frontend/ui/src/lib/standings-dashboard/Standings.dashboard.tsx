import { Week, WEEKS } from '@box-fc/frontend/domain';
import { useActivitiesQuery } from '@box-fc/frontend/query';
import { switchCase } from '@box-fc/shared/util';
import dayjs from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import { getWeek } from '../utils/datetime/week';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { ListingSwitcher, SwitchDirection } from '../utils/generic-components/listing-switcher/ListingSwitcher';
import { IndividualStandingsTableWrapper } from './individual/IndividualStandings.table-wrapper';
import { TeamsStandingsTableWrapper } from './teams/TeamsStandings.table-wrapper';

enum Listing {
    INDIVIDUAL = 'Individual standings',
    TEAMS = 'Teams standings',
}

export const StandingsDashboard = () => {
    const [activeStandings, setActiveStandings] = useState<Listing>(Listing.INDIVIDUAL);
    const [activeWeek, setActiveWeek] = useState<Week>(getWeek(dayjs()));
    const [standingsWeek, setStandingsWeek] = useState<Week>(getWeek(dayjs()));
    const [isLoadingLeft, setIsLoadingLeft] = useState<boolean>(false);
    const [isLoadingRight, setIsLoadingRight] = useState<boolean>(false);
    const { usersActivitiesAreLoading } = useActivitiesQuery({ ...activeWeek });

    useEffect(() => {
        if (!usersActivitiesAreLoading) {
            setIsLoadingLeft(false);
            setIsLoadingRight(false);

            setStandingsWeek(activeWeek);
        }
    }, [activeWeek, usersActivitiesAreLoading]);

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

        if (direction === SwitchDirection.LEFT) {
            setIsLoadingLeft(true);
        } else {
            setIsLoadingRight(true);
        }
    };

    const getStandings = (): ReactNode => {
        return switchCase({
            [Listing.INDIVIDUAL]: <IndividualStandingsTableWrapper week={standingsWeek} />,
            [Listing.TEAMS]: <TeamsStandingsTableWrapper week={standingsWeek} />,
        })(activeStandings);
    };

    return (
        <Dashboard>
            <ListingSwitcher activeListing={activeStandings} switchListing={switchStandings} />

            {getStandings()}

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
