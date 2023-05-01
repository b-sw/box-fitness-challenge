import { WEEKS } from '@box-fc/frontend/domain';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';
import { WeeklyTeamsActivitiesTab } from './WeeklyTeamsActivities.tab';

export const TeamsStandingsTable = () => {
    const [filter, setFilter] = useState<string>('');
    const TITLE = 'Teams standings';

    return (
        <TablePanel headerTitle={TITLE} headerButtons={false}>
            <SearchInput handleChange={setFilter} />

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
                        <WeeklyTeamsActivitiesTab filter={filter} week={WEEKS['1']} />
                    </TabPanel>
                    <TabPanel {...TabPanelDefaultProps}>
                        <WeeklyTeamsActivitiesTab filter={filter} week={WEEKS['2']} />
                    </TabPanel>
                    <TabPanel {...TabPanelDefaultProps}>
                        <WeeklyTeamsActivitiesTab filter={filter} week={WEEKS['3']} />
                    </TabPanel>
                    <TabPanel {...TabPanelDefaultProps}>
                        <WeeklyTeamsActivitiesTab filter={filter} week={WEEKS['4']} />
                    </TabPanel>
                    <TabPanel {...TabPanelDefaultProps}>
                        <WeeklyTeamsActivitiesTab filter={filter} week={WEEKS['5']} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
