import jwtDecode from 'jwt-decode';
import { useQuery } from 'react-query';
import { AUTH_QUERY_KEY } from '../query-keys/login.query-key';
import { AuthQuery } from '../query-types';

type Token = {
    exp: number;
};

export const useAuthQuery = () => {
    const authQuery = useQuery<AuthQuery>(AUTH_QUERY_KEY, {
        enabled: false,
        placeholderData: {
            userId: '',
            accessToken: '',
            firstName: '',
            lastName: '',
            email: '',
            team: '',
            division: '',
            userImageSrc: '',
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
