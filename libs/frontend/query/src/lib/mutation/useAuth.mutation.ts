import { Path } from '@box-fc/frontend/domain';
import { useAuthStore } from '@box-fc/frontend/store';
import { UserCredentials } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

type Props = {
    onLoginError?: (message: string) => void;
};

export const useAuthMutation = ({ onLoginError }: Props) => {
    const SERVER_AUTH_ENDPOINT = 'google/auth';
    const GOOGLE_USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo';
    const navigate = useNavigate();
    const { setUser, clearUser } = useAuthStore();

    const login = async (googleToken: string) => {
        const serverResponse = await axios.post(SERVER_AUTH_ENDPOINT, { googleToken });
        const googleResponse = await axios.get(`${GOOGLE_USER_INFO_ENDPOINT}?access_token=${googleToken}`, {
            baseURL: '',
            headers: { Authorization: `Bearer ${googleToken}`, Accept: 'application/json' },
        });

        return { ...serverResponse.data, imageUrl: googleResponse.data.picture };
    };

    const logout = async () => {
        clearUser();
        delete axios.defaults.headers.common['Authorization'];
    };

    const loginMutation = useMutation(login, {
        onSuccess: async (response: UserCredentials & { imageUrl: string }) => {
            setUser(response);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
            navigate(Path.DASHBOARD);
        },
        onError: (error: Error) => onLoginError?.(error.message),
    });

    return { loginMutation, logout };
};
