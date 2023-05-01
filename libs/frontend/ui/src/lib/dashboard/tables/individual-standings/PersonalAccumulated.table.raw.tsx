import { UserActivity } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';
import { PersonalScoreListItem } from './PersonalScoreListItem';

type Props = {
    activities: UserActivity[];
};

export const PersonalAccumulatedTableRaw = ({ activities }: Props) => {
    const [filter, setFilter] = useState<string>('');
    const TITLE = 'Individual standings';

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
                        {/*{activities.map((activity) => (*/}
                        {/*    <TeamActivityListItem personName={'Jan Kowalski'} />*/}
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
