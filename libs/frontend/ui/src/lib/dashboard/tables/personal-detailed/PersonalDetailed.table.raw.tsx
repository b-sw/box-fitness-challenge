import { Activity } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../../utils/no-records/NoRecords';
import { isEmptyObject } from '../../../utils/object/is-empty';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { PersonalActivityListItem } from './PersonalActivityListItem';

type Props = {
    activities: Activity[];
    users: { [key: string]: User };
    readonly: boolean;
    handleDelete: (activity: Activity) => void;
};

export const PersonalDetailedTableRaw = ({ activities, users, readonly, handleDelete }: Props) => {
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);
    const [filter, setFilter] = useState<string>('');
    const TITLE = 'Individual activities';

    useEffect(() => {
        if (isEmptyObject(users)) {
            return;
        }

        const filteredActivities = activities.filter((activity) => {
            const { firstName, lastName, email, team } = users[activity.userId];

            return [firstName, lastName, email, team, activity.type].some((value) =>
                value.toLowerCase().includes(filter),
            );
        });

        setFilteredActivities(filteredActivities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, activities, users]);

    return (
        <TablePanel headerTitle={TITLE} headerButtons={false}>
            <SearchInput handleChange={setFilter} />
            <Flex direction={'column'} gap={2} h={'100%'} overflowY={'scroll'}>
                {filteredActivities.length && !isEmptyObject(users) ? (
                    filteredActivities.map((activity) => (
                        <PersonalActivityListItem
                            key={`personal-activity-${activity.id}`}
                            activity={activity}
                            user={users[activity.userId]}
                            readonly={readonly}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <NoRecords />
                )}
            </Flex>
        </TablePanel>
    );
};
