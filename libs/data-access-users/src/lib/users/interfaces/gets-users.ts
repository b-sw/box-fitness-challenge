import { User } from '@box-fc/util-types';

export interface GetsUsers {
    getAllUsers(): Promise<User[]>;

    getUserById(userId: User['id']): Promise<User | null>;

    getUserByEmail(email: User['email']): Promise<User | null>;

    getUsersByRole(role: User['role']): Promise<User[]>;
}

export const GETS_USERS = Symbol('GETS_USERS');
