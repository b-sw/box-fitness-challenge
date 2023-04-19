import { UpdateUserDto, User } from '@box-fc/util-types';

export interface UpdatesUser {
    updateUser(userId: User['id'], updateUserDto: UpdateUserDto): Promise<User | null>;
}

export const UPDATES_USER = Symbol('UPDATES_USER');
