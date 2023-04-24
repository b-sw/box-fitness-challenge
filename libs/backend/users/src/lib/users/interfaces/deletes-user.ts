import { User } from '@box-fc/shared/types';

export interface DeletesUser {
    deleteUser(userId: User['id']): Promise<User | null>;
}

export const DELETES_USER = Symbol('DELETES_USER');
