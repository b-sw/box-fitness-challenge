import { Button } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md';

type Props = {
    handleClicked: () => void;
};

export const TeamsButtonRaw = ({ handleClicked }: Props) => {
    return (
        <Button onClick={handleClicked} leftIcon={<MdPeople />}>
            Edit teams
        </Button>
    );
};
