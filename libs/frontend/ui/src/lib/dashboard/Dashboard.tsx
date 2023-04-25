import { SimpleGrid } from '@chakra-ui/react';
import { Header } from '../header/Header';
import { Page } from '../utils/page/Page';
import { PersonalAccumulatedTable } from './tables/personal-accumulated/PersonalAccumulated.table';
import { PersonalDetailedTable } from './tables/personal-detailed/PersonalDetailed.table';
import { TeamsAccumulatedTable } from './tables/teams-accumulated/TeamsAccumulated.table';

export const Dashboard = () => {
    return (
        <Page>
            <Header />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <PersonalAccumulatedTable />
                <TeamsAccumulatedTable />
                <PersonalDetailedTable />
            </SimpleGrid>
        </Page>
    );
};
