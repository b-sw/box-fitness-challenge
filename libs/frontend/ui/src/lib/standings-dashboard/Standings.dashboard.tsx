import { Week } from '@box-fc/frontend/domain';
import dayjs from 'dayjs';
import { useSetState } from '../hooks';
import { getWeek } from '../utils/datetime/week';
import { Dashboard } from '../utils/generic-components/Dashboard';
import { WinnersTable } from '../winners-dashboard/Winners.table';
import { IndividualStandingsTableWrapper } from './individual/IndividualStandings.table-wrapper';

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

    return (
        <Dashboard>
            <WinnersTable />
            <IndividualStandingsTableWrapper week={week} />
        </Dashboard>
    );
};
