import { Button } from '@chakra-ui/react';
import { FaDumbbell } from 'react-icons/fa';

type ActivityButtonRawProps = {
    handleClicked: () => void;
    isEnabled: boolean;
};

export const TrainingButtonRaw = ({ handleClicked, isEnabled }: ActivityButtonRawProps) => {
    return (
        <Button isDisabled={!isEnabled} onClick={handleClicked} leftIcon={<FaDumbbell />}>
            Register training
        </Button>
    );
};
