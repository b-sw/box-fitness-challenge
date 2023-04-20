import { useAuthMutation, useAuthQuery } from '@box-fc/data-access';
import { LoginButtonRaw } from '@box-fc/ui-header';
import { defaultToastErrorOptions } from '@box-fc/util-ui';
import { useToast } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';

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
