import { SimpleGrid } from '@chakra-ui/react';
import { Header } from '../header/Header';
import { Page } from '../utils/page/Page';
import { PersonalAccumulatedTable } from './tables/individual-standings/PersonalAccumulated.table';
import { TrainingsTable } from './tables/recent-trainings/Trainings.table';
import { TeamsAccumulatedTable } from './tables/teams-standings/TeamsAccumulated.table';

export const Dashboard = () => {
    return (
        <Page>
            <Header />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <TrainingsTable />
                <TeamsAccumulatedTable />
                <PersonalAccumulatedTable />
            </SimpleGrid>
        </Page>
    );
};
