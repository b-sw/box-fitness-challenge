import { Training } from '@box-fc/frontend/query';
import { Optional, OptionalArray, User } from '@box-fc/shared/types';
import { Tab, TabList, TabPanel } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { isEmptyObject } from '../../../utils/object/is-empty';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TabPanelDefaultProps } from '../../../utils/tab-panel/tab-panel';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { TabPanels } from '../../../utils/tabs/TabPanels';
import { Tabs } from '../../../utils/tabs/Tabs';
import { TrainingListItem } from './Training.list-item';
import JSX = jsx.JSX;

type Props = {
    activities: Training[];
    users: { [key: string]: User };
    currentUserId: Optional<User['id']>;
    readonly: boolean;
    handleDelete: (activity: Training) => void;
};

export const TrainingsTableRaw = ({ activities, users, readonly, handleDelete, currentUserId }: Props) => {
    const [myActivities, setMyActivities] = useState<Training[]>([]);
    const [allActivities, setAllActivities] = useState<Training[]>(activities);
    const [filter, setFilter] = useState<string>('');
    const TITLE = 'Recent trainings';

    useEffect(() => {
        if (isEmptyObject(users)) {
            return;
        }

        const filteredAll = getFilteredActivities(activities);
        const filteredMy = filteredAll.filter((activity) => activity.userId === currentUserId);

        setAllActivities(filteredAll);
        setMyActivities(filteredMy);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, activities, users, currentUserId]);

    const getFilteredActivities = (activities: Training[]): Training[] => {
        return activities.filter((activity) => {
            const { firstName, lastName, email, team } = users[activity.userId];
            const searchedProps = [firstName, lastName, email, team, activity.type];

            return searchedProps.some((value) => value.toLowerCase().includes(filter));
        });
    };

    const getListItems = (activities: Training[]): OptionalArray<JSX.Element> => {
        if (!activities.length || isEmptyObject(users)) {
            return <NoRecords />;
        }

        return activities.map((activity) => (
            <TrainingListItem
                key={`personal-activity-${activity.id}`}
                activity={activity}
                user={users[activity.userId]}
                readonly={readonly}
                handleDelete={handleDelete}
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
                    <TabPanel {...TabPanelDefaultProps}>{getListItems(myActivities)}</TabPanel>

                    <TabPanel {...TabPanelDefaultProps}>{getListItems(allActivities)}</TabPanel>
                </TabPanels>
            </Tabs>
        </TablePanel>
    );
};
