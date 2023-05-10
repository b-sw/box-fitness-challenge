import { Button } from '@chakra-ui/react';
import { FaDumbbell } from 'react-icons/fa';

type Props = {
    handleClicked: () => void;
};

export const TrainingButtonRaw = ({ handleClicked }: Props) => {
    return (
        <Button onClick={handleClicked} leftIcon={<FaDumbbell />}>
            Register training
        </Button>
    );
};
