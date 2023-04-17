import { TablePanel } from '@box-fc/util-ui';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/all';
import { PersonalListItem } from './PersonalListItem';

export const PersonalTable = () => {
    return (
        <TablePanel headerTitle={'Personal standings'} headerButtons={false}>
            <InputGroup>
                <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
                <Input mb={2} placeholder={'Search here'} />
            </InputGroup>

            <Flex direction={'column'} gap={2} overflow={'scroll'}>
                <PersonalListItem />
                <PersonalListItem />
                <PersonalListItem />
            </Flex>
        </TablePanel>
    );
};
