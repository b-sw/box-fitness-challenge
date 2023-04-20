import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

type LoginButtonProps = {
    onCLick: () => void;
    isLoading: boolean;
};

export const LoginButtonRaw = ({ onCLick, isLoading }: LoginButtonProps) => {
    return (
        <Button isLoading={isLoading} onClick={onCLick} leftIcon={<FcGoogle />}>
            Sign in
        </Button>
    );
};
