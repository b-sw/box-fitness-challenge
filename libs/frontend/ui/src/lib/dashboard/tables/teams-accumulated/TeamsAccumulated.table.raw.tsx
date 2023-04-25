import { AccumulatedTeamActivity, User } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';
import { TeamScoreListItem } from './TeamScoreListItem';

type Props = {
    activities: AccumulatedTeamActivity[];
    users: { [key: string]: User };
};

export const TeamsAccumulatedTableRaw = ({ activities, users }: Props) => {
    const TITLE = 'Teams standings';

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
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                        <TeamScoreListItem personName={'Jan Kowalski'} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
