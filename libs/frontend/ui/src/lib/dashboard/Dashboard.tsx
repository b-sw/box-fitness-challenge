import { SimpleGrid } from '@chakra-ui/react';
import { TeamsStandingsTable } from 'libs/frontend/ui/src/lib/dashboard/tables/teams-standings/TeamsStandings.table';
import { Header } from '../header/Header';
import { Page } from '../utils/page/Page';
import { PersonalAccumulatedTable } from './tables/individual-standings/PersonalAccumulated.table';
import { TrainingsTable } from './tables/recent-trainings/Trainings.table';

export const Dashboard = () => {
    return (
        <Page>
            <Header />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <TrainingsTable />
                <TeamsStandingsTable />
                <PersonalAccumulatedTable />
            </SimpleGrid>
        </Page>
    );
};
