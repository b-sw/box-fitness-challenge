import { HeaderPanel } from '@box-fc/ui-header';
import { Page, TablePanel } from '@box-fc/util-ui';
import { SimpleGrid } from '@chakra-ui/react';
import { PersonalTable } from './personal-table/PersonalTable';

export const TablesDashboard = () => {
    return (
        <Page>
            <HeaderPanel title={'Big freaking header'} />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <PersonalTable />
                <TablePanel headerTitle={'Teams standings'} headerButtons={false} />
                <TablePanel headerTitle={'Category standings'} headerButtons={false} />
            </SimpleGrid>
        </Page>
    );
};
