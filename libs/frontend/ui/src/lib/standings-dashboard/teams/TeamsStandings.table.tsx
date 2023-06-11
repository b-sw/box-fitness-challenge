import { TeamActivity } from '@box-fc/shared/types';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../../utils/no-records/NoRecords';
import { SearchInput } from '../../utils/search/SearchInput';
import { TablePanel } from '../../utils/table-panel/TablePanel';
import { TeamActivityListItem } from './TeamActivity.list-item';

type Props = {
    teamsActivities: TeamActivity[];
};

export const TeamsStandingsTable = ({ teamsActivities }: Props) => {
    const [filter, setFilter] = useState<string>('');
    const [filteredActivities, setFilteredActivities] = useState<TeamActivity[]>(teamsActivities);

    useEffect(() => {
        const filteredActivities = getFilteredActivities();

        setFilteredActivities(filteredActivities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, teamsActivities]);

    const getFilteredActivities = (): TeamActivity[] => {
        return teamsActivities.filter((teamActivity) => teamActivity.team.toLowerCase().includes(filter.toLowerCase()));
    };

    const getListItems = () => {
        if (!teamsActivities.length || !filteredActivities.length) {
            return <NoRecords />;
        }

        const maxScore = Math.max(...teamsActivities.map((teamActivity) => teamActivity.score));
        const maxAverageMemberScore = Math.max(...teamsActivities.map((teamActivity) => teamActivity.meanScore));

        return (
            <>
                {filteredActivities.map((teamActivity) => (
                    <TeamActivityListItem
                        key={`${teamActivity.team}`}
                        teamActivity={teamActivity}
                        maxScore={maxScore}
                        maxAverageMemberScore={maxAverageMemberScore}
                    />
                ))}
            </>
        );
    };

    return (
        <TablePanel>
            <SearchInput handleChange={setFilter} placeholder={'Search teams'} />

            <Flex
                w={'100%'}
                direction={'column'}
                shadow={'md'}
                h={'fit-content'}
                overflowY={'scroll'}
                backgroundColor={'gray.50'}
                borderRadius={25}
            >
                {getListItems()}
            </Flex>
        </TablePanel>
    );
};
