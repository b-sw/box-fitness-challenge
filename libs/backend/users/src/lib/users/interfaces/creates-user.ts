import { CreateUserDto, User } from '@box-fc/shared/types';

export interface CreatesUser {
    createUser(createUserDto: CreateUserDto): Promise<User>;
}

export const CREATES_USER = Symbol('CREATES_USER');
