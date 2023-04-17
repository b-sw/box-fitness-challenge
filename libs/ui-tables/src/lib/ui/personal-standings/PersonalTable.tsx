import { SearchInput, TablePanel, TabPanelDefaultProps, TabPanels, Tabs } from '@box-fc/util-ui';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { PersonalListItem } from './PersonalListItem';

export const PersonalTable = () => {
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
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                        <PersonalListItem personName={'Jan Kowalski'} />
                        <PersonalListItem personName={'Bartosz Świtalski'} />
                        <PersonalListItem personName={'Jakub Wincewicz'} />
                    </TabPanel>

                    <TabPanel {...TabPanelDefaultProps}></TabPanel>

                    <TabPanel {...TabPanelDefaultProps}></TabPanel>

                    <TabPanel {...TabPanelDefaultProps}></TabPanel>

                    <TabPanel {...TabPanelDefaultProps}></TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
