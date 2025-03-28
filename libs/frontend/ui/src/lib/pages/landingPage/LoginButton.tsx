import { useAuthMutation, useMobileQuery } from '@box-fc/frontend/query';
import { Button, Text, useToast } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { defaultToastErrorOptions } from '../../utils/toast/toast-info';

export const LoginButton = () => {
    const { isMobile } = useMobileQuery();
    const toast = useToast();
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => loginMutation.mutate(codeResponse.access_token),
        onError: ({ error_description }) => toast({ title: error_description, ...defaultToastErrorOptions }),
    });
    const onLoginError = (message: string) => toast({ title: message, ...defaultToastErrorOptions });
    const { loginMutation } = useAuthMutation({ onLoginError });

    return (
        <Button
            isLoading={loginMutation.isLoading}
            onClick={() => googleLogin()}
            leftIcon={<FcGoogle size={isMobile ? '32px' : '64px'} />}
            size={'lg'}
            p={isMobile ? '36px' : '48px'}
        >
            <Text fontSize={isMobile ? '2xl' : '4xl'} color={'customPurple.500'} fontWeight={'bold'}>
                Sign in to submit km!
            </Text>
        </Button>
    );
};
