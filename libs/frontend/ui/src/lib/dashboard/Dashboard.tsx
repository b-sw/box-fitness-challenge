import { useUsersQuery } from '@box-fc/frontend/query';
import { SimpleGrid } from '@chakra-ui/react';
import { Header } from '../header/Header';
import { LoadingOverlay } from '../utils/loading-overlay/LoadingOverlay';
import { Page } from '../utils/page/Page';
import { UsersActivitiesTable } from './tables/individual-standings/UsersActivities.table';
import { TrainingsTable } from './tables/recent-trainings/Trainings.table';
import { TeamsStandingsTable } from './tables/teams-standings/TeamsStandings.table';

export const Dashboard = () => {
    const { isLoading } = useUsersQuery();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            <Header />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <TrainingsTable />
                <TeamsStandingsTable />
                <UsersActivitiesTable />
            </SimpleGrid>
        </Page>
    );
};
