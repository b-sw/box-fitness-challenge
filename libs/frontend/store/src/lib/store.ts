import { UserInfo } from '@box-fc/shared/types';
import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const getInitialUser = (): UserInfo =>
    ({
        id: null,
        accessToken: null,
        firstName: null,
        lastName: null,
        email: null,
        team: null,
        division: null,
        role: null,
        imageUrl: null,
    } as unknown as UserInfo);

type AuthState = {
    user: UserInfo;
    setUser: (newUser: UserInfo) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: getInitialUser(),
                setUser: (newUser: UserInfo) => set((_) => ({ user: newUser })),
                clearUser: () => set((_) => ({ user: getInitialUser() })),
            }),
            {
                name: 'bear-storage',
            },
        ),
    ),
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user.accessToken;
