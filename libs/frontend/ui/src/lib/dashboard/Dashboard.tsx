import { Path } from '@box-fc/frontend/domain';
import { useMobileQuery, useUsersQuery } from '@box-fc/frontend/query';
import { Flex, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuthRouteAdmin } from '../auth/RequireAuthRouteAdmin';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import { Navbar } from '../sidebar/Navbar';
import { StandingsDashboard } from '../standings-dashboard/Standings.dashboard';
import { TeamsDashboard } from '../teams-dasbhoard/Teams.dashboard';
import { TrainingsDashboard } from '../trainings-dashboard/Trainings.dashboard';
import { LoadingOverlay } from '../utils/loading-overlay/LoadingOverlay';
import { Page } from '../utils/page/Page';

export const Dashboard = () => {
    const { usersAreLoading } = useUsersQuery();
    const { isMobile } = useMobileQuery();

    const routes = useMemo(
        () => (
            <Routes>
                <Route path={Path.ACTIVITIES} element={<TrainingsDashboard />} />
                <Route path={Path.STANDINGS} element={<StandingsDashboard />} />
                {/*<Route path={Path.WINNERS} element={<WinnersDashboard />} />*/}
                <Route element={<RequireAuthRouteAdmin />}>
                    <Route path={Path.TEAMS} element={<TeamsDashboard />} />
                </Route>
                <Route path="*" element={<Navigate to={Path.LANDING_PAGE} replace />} />
            </Routes>
        ),
        [],
    );

    if (usersAreLoading) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            {isMobile ? <MobileMenu /> : <Navbar />}

            <Flex mt={['12vh', 0]} h="100%" w="100%" overflow={'hidden'}>
                <Spacer />
                {routes}
                <Spacer />
            </Flex>
        </Page>
    );
};
