import { ActivityQueryType } from '@box-fc/frontend/query';
import { User } from '@box-fc/shared/types';
import { Flex } from '@chakra-ui/react';
import { SearchInput } from '../../../utils/search/SearchInput';
import { TablePanel } from '../../../utils/table-panel/TablePanel';
import { PersonalActivityListItem } from './PersonalActivityListItem';

type Props = {
    activities: ActivityQueryType[];
    users: { [key: string]: User };
};

export const PersonalDetailedTableRaw = ({ activities, users }: Props) => {
    const TITLE = 'Individual activities';

    const listItems = activities
        .filter((activity) => !!users[activity.userId])
        .map((activity) => (
            <PersonalActivityListItem
                key={`personal-activity-${activity.id}`}
                activity={activity}
                user={users[activity.userId]}
            />
        ));

    return (
        <TablePanel headerTitle={TITLE} headerButtons={false}>
            <SearchInput />
            <Flex direction={'column'} gap={2} h={'100%'} overflowY={'scroll'}>
                {listItems}
            </Flex>
        </TablePanel>
    );
};
