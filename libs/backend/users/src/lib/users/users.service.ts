import { CreateUserDto, Role, UpdateUserDto, User, uuid } from '@box-fc/shared/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatesUser, DeletesUser, GetsUsers, UpdatesUser } from './interfaces';

type UserId = User['id'];

@Injectable()
export class UsersService implements CreatesUser, GetsUsers, UpdatesUser, DeletesUser {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getUsersByRole(role: Role): Promise<User[]> {
        return this.usersRepository.find({ where: { role: role } });
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email: email } });
    }

    getUserById(userId: uuid): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id: userId } });
    }

    createUser(createDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(createDto);

        return this.usersRepository.save(newUser);
    }

    async updateUser(userId: UserId, updateDto: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update(userId, updateDto);

        return await this.getUserById(userId);
    }

    async deleteUser(userId: UserId): Promise<User | null> {
        const user = await this.getUserById(userId);

        await this.usersRepository.delete(userId);

        return user;
    }
}
