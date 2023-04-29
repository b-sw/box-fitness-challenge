// import { Role } from '@box-fc/shared/types';
import jwtDecode from 'jwt-decode';
import { useQuery } from 'react-query';
import { AUTH_QUERY_KEY } from '../query-keys/login.query-key';
import { AuthCredentials } from '../query-types';

type Token = {
    exp: number;
};

export const useAuthQuery = () => {
    const authQuery = useQuery<AuthCredentials>(AUTH_QUERY_KEY, {
        enabled: false,
        placeholderData: {
            userId: '',
            accessToken: '',
            firstName: '',
            lastName: '',
            email: '',
            team: '',
            division: '',
            role: '',
            userImageSrc: '',
        },
    });

    const tokenExpired = (token: string): boolean => {
        const currentTime = new Date().getTime() / 1000;
        const decoded = jwtDecode<Token>(token);
        const expirationTime = decoded.exp;

        return currentTime > expirationTime;
    };

    // todo: figure out why importing another domain is bad when importing react
    const isAdmin = authQuery.data?.role === 'Admin';
    const isLoggedIn =
        Boolean(authQuery.data?.accessToken) && !tokenExpired(authQuery?.data?.accessToken as unknown as string);
    const currentUserId = authQuery.data?.userId;

    return { authQuery, isLoggedIn, isAdmin, currentUserId };
};
