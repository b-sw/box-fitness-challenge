import { User } from '@box-fc/util-types';

export interface DeletesUser {
    deleteUser(userId: User['id']): Promise<User | null>;
}

export const DELETES_USER = Symbol('DELETES_USER');
