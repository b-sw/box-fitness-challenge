import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/all';

type Props = {
    handleChange: (value: string) => void;
    placeholder?: string;
};

export const SearchInput = ({ handleChange, placeholder }: Props) => {
    const PLACEHOLDER = placeholder ?? 'Search here';

    return (
        <InputGroup size={'lg'}>
            <InputLeftElement pointerEvents={'none'} textColor={'primary.500'} children={<MdSearch />} fontSize={25} />
            <Input
                placeholder={PLACEHOLDER}
                onChange={(event) => handleChange(event.target.value)}
                rounded={'full'}
                shadow={'md'}
            />
        </InputGroup>
    );
};
