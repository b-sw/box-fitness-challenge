import { useAuthMutation, useAuthQuery } from '@box-fc/frontend/query';
import { useToast } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { defaultToastErrorOptions } from 'libs/frontend/ui/src/lib/utils/toast/toast-info';
import { LoginButtonRaw } from './login-buton/LoginButton.raw';

export const LoginButton = () => {
    const toast = useToast();
    const { loginMutation } = useAuthMutation();
    const { isLoggedIn } = useAuthQuery();
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => loginMutation.mutate(codeResponse.access_token),
        onError: ({ error_description }) => toast({ title: error_description, ...defaultToastErrorOptions }),
    });

    return isLoggedIn ? null : <LoginButtonRaw onCLick={googleLogin} isLoading={loginMutation.isLoading} />;
};