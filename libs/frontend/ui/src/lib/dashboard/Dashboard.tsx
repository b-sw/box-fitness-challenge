import { Path } from '@box-fc/frontend/domain';
import { useUsersQuery } from '@box-fc/frontend/query';
import { Flex, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import { TrainingsDashboard } from '../trainings-dashboard/Trainings.dashboard';
import { LoadingOverlay } from '../utils/loading-overlay/LoadingOverlay';
import { Page } from '../utils/page/Page';
import { TeamsStandingsTable } from './tables/teams-standings/TeamsStandings.table';

export const Dashboard = () => {
    const { isLoading } = useUsersQuery();

    const routes = useMemo(
        () => (
            <Routes>
                <Route path={Path.TRAININGS} element={<TrainingsDashboard />} />
                <Route path={Path.STANDINGS} element={<TeamsStandingsTable />} />
                {/*<Route path={Path.WINNERS} element={<UsersActivitiesTable />} />*/}
                <Route path="*" element={<Navigate to={Path.LANDING_PAGE} replace />} />
            </Routes>
        ),
        [],
    );

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            <Sidebar />
            <Flex w={'100%'}>
                <Spacer />
                {routes}
                <Spacer />
            </Flex>
        </Page>
    );
};
