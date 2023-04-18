import { Role, User, uuid } from '@box-fc/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParams } from './params/user.params';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getByRole(role: Role): Promise<User[]> {
        return this.usersRepository.find({ where: { role: role } });
    }

    getByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email: email } });
    }

    getById(userId: uuid): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id: userId } });
    }

    create(createDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(createDto);
        return this.usersRepository.save(newUser);
    }

    async update(userParams: UserParams, updateDto: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update(userParams.userId, updateDto);

        return await this.getById(userParams.userId);
    }

    async remove(userParams: UserParams): Promise<User | null> {
        const user = await this.getById(userParams.userId);

        await this.usersRepository.delete(userParams.userId);

        return user;
    }
}
