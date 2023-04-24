import { AccumulatedUserActivity } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { SearchInput } from '../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../utils/table-panel/TablePanel';
import { TabPanels } from '../../utils/tabs/TabPanels';
import { Tabs } from '../../utils/tabs/Tabs';
import { PersonalListItem } from './PersonalListItem';

type PersonalTableProps = {
    activities: AccumulatedUserActivity[];
};

export const PersonalTableRaw = ({ activities }: PersonalTableProps) => {
    const TITLE = 'Personal standings';

    return (
        <TablePanel headerTitle={TITLE} headerButtons={false}>
            <SearchInput />

            <Tabs>
                <TabList>
                    <Tab>Week I</Tab>
                    <Tab>Week II</Tab>
                    <Tab>Week III</Tab>
                    <Tab>Week IV</Tab>
                    <Tab>Week V</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel {...TabPanelDefaultProps}>
                        {/*{activities.map((activity) => (*/}
                        {/*    <PersonalListItem personName={'Jan Kowalski'} />*/}
                        {/*))}*/}
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
