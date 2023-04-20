import jwtDecode from 'jwt-decode';
import { useQuery } from 'react-query';
import { AUTH_QUERY_KEY } from '../query-keys/login.query-key';

type Token = {
    exp: number;
};

export const useAuthQuery = () => {
    const authQuery = useQuery(AUTH_QUERY_KEY, {
        enabled: false,
        placeholderData: {
            id: null,
            accessToken: null,
            firstName: null,
            lastName: null,
            email: null,
            userImageSrc: null,
        },
    });

    const tokenExpired = (token: string): boolean => {
        const currentTime = new Date().getTime() / 1000;
        const decoded = jwtDecode<Token>(token);
        const expirationTime = decoded.exp;

        return currentTime > expirationTime;
    };

    const isLoggedIn =
        Boolean(authQuery.data?.accessToken) && !tokenExpired(authQuery?.data?.accessToken as unknown as string);

    return { authQuery, isLoggedIn };
};
