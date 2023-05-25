import { Training } from '@box-fc/frontend/query';
import { Optional, OptionalArray, User } from '@box-fc/shared/types';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../utils/no-records/NoRecords';
import { SearchInput } from '../utils/search/SearchInput';
import { TablePanel } from '../utils/table-panel/TablePanel';
import { TrainingListItem } from './Training.list-item';
import JSX = jsx.JSX;

type Props = {
    trainings: Training[];
    users: Map<User['id'], User>;
    currentUserId: Optional<User['id']>;
    readonly: boolean;
    handleDelete: (training: Training) => void;
    handleCreate: () => void;
    isMobile: boolean;
};

export const TrainingsTableRaw = ({
    trainings,
    users,
    readonly,
    handleDelete,
    handleCreate,
    currentUserId,
    isMobile,
}: Props) => {
    const [filteredTrainings, setFilteredTrainings] = useState<Training[]>(trainings);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        if (users.size === 0) {
            return;
        }

        setFilteredTrainings(getFilteredTrainings(trainings));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, trainings, users, currentUserId]);

    const getFilteredTrainings = (trainings: Training[]): Training[] => {
        return trainings.filter((training) => {
            const { firstName, lastName, email, team } = users.get(training.userId) as User;
            const searchedProps = [firstName, lastName, email, team, training.type, `${firstName} ${lastName}`];

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
            />
        ));
    };

    return (
        <TablePanel>
            <Flex gap={5}>
                <SearchInput handleChange={setFilter} placeholder={'Search trainings'} />
                <Tooltip label={'Register training'}>
                    <IconButton
                        aria-label={'register-training'}
                        size={'lg'}
                        rounded={'full'}
                        onClick={handleCreate}
                        icon={<AddIcon />}
                        backgroundColor={'primary.50'}
                    />
                </Tooltip>
            </Flex>

            <Flex
                direction={'column'}
                h={'fit-content'}
                overflowY={'scroll'}
                backgroundColor={'gray.50'}
                borderRadius={25}
            >
                {getListItems(filteredTrainings)}
            </Flex>
        </TablePanel>
    );
};
