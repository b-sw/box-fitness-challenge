import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/all';

type Props = {
    handleChange: (value: string) => void;
};

export const SearchInput = ({ handleChange }: Props) => {
    const PLACEHOLDER = 'Search here';

    return (
        <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
            <Input mb={2} placeholder={PLACEHOLDER} onChange={(event) => handleChange(event.target.value)} />
        </InputGroup>
    );
};
