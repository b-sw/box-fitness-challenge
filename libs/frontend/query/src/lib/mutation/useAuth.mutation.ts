import { Path } from '@box-fc/frontend/domain';
import { UserCredentials } from '@box-fc/shared/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AUTH_QUERY_KEY } from '../query-keys/login.query-key';

export const useAuthMutation = () => {
    const SERVER_AUTH_ENDPOINT = 'google/auth';
    const GOOGLE_USER_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo';
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const login = async (googleToken: string) => {
        const serverResponse = await axios.post(SERVER_AUTH_ENDPOINT, { googleToken });
        const googleResponse = await axios.get(`${GOOGLE_USER_INFO_ENDPOINT}?access_token=${googleToken}`, {
            baseURL: '',
            headers: { Authorization: `Bearer ${googleToken}`, Accept: 'application/json' },
        });

        return { ...serverResponse.data, userImageSrc: googleResponse.data.picture };
    };

    const logout = async () => {
        queryClient.setQueryData([AUTH_QUERY_KEY], () => ({}));
        delete axios.defaults.headers.common['Authorization'];
    };

    const loginMutation = useMutation(login, {
        onSuccess: async (response: UserCredentials & { userImageSrc: string }) => {
            await queryClient.invalidateQueries();
            queryClient.setQueryData([AUTH_QUERY_KEY], () => response);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
            navigate(Path.DASHBOARD);
        },
    });

    return { loginMutation, logout };
};
