import { AccumulatedUserActivity } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { PersonalScoreListItem } from 'libs/frontend/ui/src/lib/dashboard/tables/personal-accumulated/PersonalScoreListItem';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';

type Props = {
    activities: AccumulatedUserActivity[];
};

export const PersonalAccumulatedTableRaw = ({ activities }: Props) => {
    const TITLE = 'Individual standings';

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
                        {/*    <TeamScoreListItem personName={'Jan Kowalski'} />*/}
                        {/*))}*/}
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                        <PersonalScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
