import { Training } from '@box-fc/frontend/query';
import { OptionalArray, User } from '@box-fc/shared/types';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NoRecords } from '../utils/no-records/NoRecords';
import { SearchInput } from '../utils/search/SearchInput';
import { TablePanel } from '../utils/table-panel/TablePanel';
import { TrainingListItem } from './Training.list-item';

type Props = {
    trainings: Training[];
    users: Map<User['id'], User>;
    readonly: boolean;
    handleDelete: (training: Training) => void;
    handleCreate: () => void;
    showCreate: boolean;
};

export const TrainingsTableRaw = ({ trainings, users, readonly, handleDelete, handleCreate, showCreate }: Props) => {
    const [filteredTrainings, setFilteredTrainings] = useState<Training[]>(trainings);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        if (users.size === 0) {
            return;
        }

        setFilteredTrainings(getFilteredTrainings(trainings));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, trainings, users]);

    const getFilteredTrainings = (trainings: Training[]): Training[] => {
        return trainings.filter((training) => {
            const { firstName, lastName, email, team } = users.get(training.userId) as User;
            const searchedProps = [firstName, lastName, email, team, training.type, `${firstName} ${lastName}`];

            return searchedProps.some((value) => value?.toLowerCase().includes(filter.toLowerCase()));
        });
    };

    const getListItems = (): OptionalArray<JSX.Element> => {
        if (!filteredTrainings.length || users.size === 0) {
            return <NoRecords />;
        }

        return filteredTrainings.map((training) => (
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
                {showCreate && (
                    <Tooltip label={'Register training'}>
                        <IconButton
                            aria-label={'register-training'}
                            size={'lg'}
                            rounded={'full'}
                            onClick={handleCreate}
                            icon={<AddIcon />}
                            backgroundColor={'primary.50'}
                            shadow={'md'}
                        />
                    </Tooltip>
                )}
            </Flex>

            <Flex
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
