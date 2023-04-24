import { SimpleGrid } from '@chakra-ui/react';
import { PersonalTable } from 'libs/frontend/ui/src/lib/tables/personal-accumulated/PersonalTable';
import { Header } from '../header/Header';
import { Page } from '../utils/page/Page';
import { TablePanel } from '../utils/table-panel/TablePanel';

export const Dashboard = () => {
    return (
        <Page>
            <Header />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <PersonalTable />
                <TablePanel headerTitle={'Teams standings'} headerButtons={false} />
                <TablePanel headerTitle={'Personal activities'} headerButtons={false} />
            </SimpleGrid>
        </Page>
    );
};
