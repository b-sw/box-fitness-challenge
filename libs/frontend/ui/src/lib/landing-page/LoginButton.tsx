import { useAuthMutation } from '@box-fc/frontend/query';
import { Button, useToast } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { defaultToastErrorOptions } from '../utils/toast/toast-info';

export const LoginButton = () => {
    const toast = useToast();
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => loginMutation.mutate(codeResponse.access_token),
        onError: ({ error_description }) => toast({ title: error_description, ...defaultToastErrorOptions }),
    });
    const onLoginError = (message: string) => toast({ title: message, ...defaultToastErrorOptions });
    const { loginMutation } = useAuthMutation({ onLoginError });

    return (
        <Button isLoading={loginMutation.isLoading} onClick={() => googleLogin()} leftIcon={<FcGoogle />}>
            Sign in (coming soon)
        </Button>
    );
};
