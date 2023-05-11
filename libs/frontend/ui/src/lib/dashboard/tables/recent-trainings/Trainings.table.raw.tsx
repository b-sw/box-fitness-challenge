import { Training } from '@box-fc/frontend/query';
import { Optional, OptionalArray, User } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';
import { TrainingListItem } from './Training.list-item';
import JSX = jsx.JSX;

type Props = {
    trainings: Training[];
    users: Map<User['id'], User>;
    currentUserId: Optional<User['id']>;
    readonly: boolean;
    handleDelete: (training: Training) => void;
    isMobile: boolean;
};

export const TrainingsTableRaw = ({ trainings, users, readonly, handleDelete, currentUserId, isMobile }: Props) => {
    const [myTrainings, setMyTrainings] = useState<Training[]>([]);
    const [allTrainings, setAllTrainings] = useState<Training[]>(trainings);
    const [filter, setFilter] = useState<string>('');
    const TITLE = 'Recent trainings';

    useEffect(() => {
        if (users.size === 0) {
            return;
        }

        const filteredAll = getFilteredTrainings(trainings);
        const filteredMy = filteredAll.filter((training) => training.userId === currentUserId);

        setAllTrainings(filteredAll);
        setMyTrainings(filteredMy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, trainings, users, currentUserId]);

    const getFilteredTrainings = (trainings: Training[]): Training[] => {
        return trainings.filter((training) => {
            const { firstName, lastName, email, team } = users.get(training.userId) as User;
            const searchedProps = [firstName, lastName, email, team, training.type];

            return searchedProps.some((value) => value?.toLowerCase().includes(filter.toLowerCase()));
        });
    };

    const getListItems = (trainings: Training[]): OptionalArray<JSX.Element> => {
        if (!trainings.length || users.size === 0) {
            return <NoRecords />;
        }

        return trainings.map((training) => (
            <TrainingListItem
                key={`personal-training-${training.id}`}
                training={training}
                user={users.get(training.userId) as User}
                readonly={readonly}
                handleDelete={handleDelete}
                isMobile={isMobile}
            />
        ));
    };

    return (
        <TablePanel headerTitle={TITLE} headerButtons={false}>
            <SearchInput handleChange={setFilter} />

            <Tabs>
                <TabList>
                    <Tab>My trainings</Tab>
                    <Tab>All trainings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel {...TabPanelDefaultProps}>{getListItems(myTrainings)}</TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>{getListItems(allTrainings)}</TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
