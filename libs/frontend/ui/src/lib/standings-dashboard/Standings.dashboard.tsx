import { Week } from '@box-fc/frontend/domain';
import { switchCase } from '@box-fc/shared/util';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { useSetState } from '../hooks';
import { getWeek } from '../utils/datetime/week';
import { ListingSwitcher } from '../utils/generic-components/ListingSwitcher';
import { WeekDashboard } from '../utils/generic-components/Week.dashboard';
import { IndividualStandingsTableWrapper } from './individual/IndividualStandings.table-wrapper';
import { TeamsStandingsTableWrapper } from './teams/TeamsStandings.table-wrapper';

enum Listing {
    INDIVIDUAL = 'Individual standings',
    TEAMS = 'Teams standings',
}

type State = {
    listing: Listing;
    week: Week;
};

export const StandingsDashboard = () => {
    const [{ listing, week }, setState] = useSetState<State>({
        listing: Listing.INDIVIDUAL,
        week: getWeek(dayjs()),
    });

    const switchStandings = () =>
        setState({ listing: listing === Listing.INDIVIDUAL ? Listing.TEAMS : Listing.INDIVIDUAL });

    const getStandings = (): ReactNode => {
        return switchCase({
            [Listing.INDIVIDUAL]: <IndividualStandingsTableWrapper week={week} />,
            [Listing.TEAMS]: <TeamsStandingsTableWrapper week={week} />,
        })(listing);
    };

    return (
        <WeekDashboard week={week} setWeek={(newWeek) => setState({ week: newWeek })}>
            <ListingSwitcher activeListing={listing} switchListing={switchStandings} />

            {getStandings()}
        </WeekDashboard>
    );
};
