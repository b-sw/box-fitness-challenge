import { useAuthStore } from '@box-fc/frontend/store';
import jwtDecode from 'jwt-decode';

type Token = {
    exp: number;
};

export const useAuthQuery = () => {
    const { user } = useAuthStore();

    const tokenExpired = (token: string): boolean => {
        const currentTime = new Date().getTime() / 1000;
        const decoded = jwtDecode<Token>(token);
        const expirationTime = decoded.exp;

        return currentTime > expirationTime;
    };

    const isLoggedIn = !!user.accessToken && !tokenExpired(user.accessToken);

    // todo: figure out why importing another domain is bad when importing react
    const isAdmin = isLoggedIn && user.role === 'Admin';

    return { isLoggedIn, isAdmin };
};
