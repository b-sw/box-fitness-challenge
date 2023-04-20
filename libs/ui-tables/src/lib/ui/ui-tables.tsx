import { Header } from '@box-fc/feature';
import { Page, TablePanel } from '@box-fc/util-ui';
import { SimpleGrid } from '@chakra-ui/react';
import { PersonalTable } from './personal-standings/PersonalTable';

export const TablesDashboard = () => {
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
