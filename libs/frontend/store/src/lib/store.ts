import { UserInfo, WithNull } from '@box-fc/shared/types';
import axios from 'axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = WithNull<UserInfo> & WithNull<{ imageUrl: string }>;

const getInitialUser = (): User => ({
    id: null,
    accessToken: null,
    firstName: null,
    lastName: null,
    email: null,
    team: null,
    division: null,
    role: null,
    imageUrl: null,
});

type AuthState = {
    user: User;
    setUser: (newUser: User) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: getInitialUser(),
                setUser: (newUser: User) => set((_) => ({ user: newUser })),
                clearUser: () => set((_) => ({ user: getInitialUser() })),
            }),
            {
                name: 'bear-storage',
            },
        ),
    ),
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user.accessToken;
