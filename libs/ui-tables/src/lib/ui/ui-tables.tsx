import { HeaderPanel } from '@box-fc/ui-header';
import { Page, TablePanel } from '@box-fc/util-ui';
import { SimpleGrid } from '@chakra-ui/react';

export const TablesDashboard = () => {
    return (
        <Page>
            <HeaderPanel title={'Box Fitness Challenge'} />
            <SimpleGrid columns={[1, 1, 3]} flexGrow={1} overflowY={'hidden'} spacing={5}>
                <TablePanel headerTitle={'Personal'} headerButtons={false} />
                <TablePanel headerTitle={'Teams'} headerButtons={false} />
                <TablePanel headerTitle={'Category'} headerButtons={false} />
            </SimpleGrid>
        </Page>
    );
};
