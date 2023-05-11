import { Path } from '@box-fc/frontend/domain';
import { useAuthStore } from '@box-fc/frontend/store';
import { UserInfo } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

type Props = {
    onLoginError?: (message: string) => void;
};

export const useAuthMutation = ({ onLoginError }: Props) => {
    const SERVER_AUTH_ENDPOINT = 'google/auth';
    const navigate = useNavigate();
    const { setUser, clearUser } = useAuthStore();

    const login = async (googleToken: string) => {
        const serverResponse = await axios.post(SERVER_AUTH_ENDPOINT, { googleToken });

        return { ...serverResponse.data };
    };

    const logout = async () => {
        clearUser();
        delete axios.defaults.headers.common['Authorization'];
    };

    const loginMutation = useMutation(login, {
        onSuccess: async (response: UserInfo) => {
            setUser(response);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
            navigate(Path.DASHBOARD);
        },
        onError: (error: Error) => onLoginError?.(error.message),
    });

    return { loginMutation, logout };
};
