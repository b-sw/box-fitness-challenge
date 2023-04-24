import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/all';

export const SearchInput = () => {
    const PLACEHOLDER = 'Search here';

    return (
        <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
            <Input mb={2} placeholder={PLACEHOLDER} />
        </InputGroup>
    );
};
