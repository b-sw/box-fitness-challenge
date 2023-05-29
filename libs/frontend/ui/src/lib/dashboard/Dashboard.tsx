import { Path } from '@box-fc/frontend/domain';
import { useMobileQuery, useUsersQuery } from '@box-fc/frontend/query';
import { Flex, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuthRouteAdmin } from '../auth/RequireAuthRouteAdmin';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import { Sidebar } from '../sidebar/Sidebar';
import { StandingsDashboard } from '../standings-dashboard/Standings.dashboard';
import { TeamsDashboard } from '../teams-dasbhoard/Teams.dashboard';
import { TrainingsDashboard } from '../trainings-dashboard/Trainings.dashboard';
import { LoadingOverlay } from '../utils/loading-overlay/LoadingOverlay';
import { Page } from '../utils/page/Page';

export const Dashboard = () => {
    const { isLoading } = useUsersQuery();
    const { isMobile } = useMobileQuery();

    const routes = useMemo(
        () => (
            <Routes>
                <Route path={Path.TRAININGS} element={<TrainingsDashboard />} />
                <Route path={Path.STANDINGS} element={<StandingsDashboard />} />
                {/*<Route path={Path.WINNERS} element={<UsersActivitiesTable />} />*/}
                <Route element={<RequireAuthRouteAdmin />}>
                    <Route path={Path.TEAMS} element={<TeamsDashboard />} />
                </Route>
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
            {isMobile ? <MobileMenu /> : <Sidebar />}
            <Flex w={'100%'} mt={['10vh', 0]}>
                <Spacer />
                {routes}
                <Spacer />
            </Flex>
        </Page>
    );
};
