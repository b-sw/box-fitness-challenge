import { AdminGuard, JwtGuard } from '@box-fc/backend/guards';
import { CreateUserDto, Role, UpdateUserDto, User, UserParams } from '@box-fc/shared/types';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('users')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all users' })
    async getAll(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get('users/admins')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all admins' })
    async getAllAdmins(): Promise<User[]> {
        return this.usersService.getUsersByRole(Role.Admin);
    }

    @Get('users/employees')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all employees' })
    async getAllEmployees(): Promise<User[]> {
        return this.usersService.getUsersByRole(Role.Employee);
    }

    @Get('users/:userId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get user by id' })
    async getById(@Param() params: UserParams): Promise<User | null> {
        return await this.usersService.getUserById(params.userId);
    }

    @Post('users')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() dto: CreateUserDto): Promise<User | null> {
        return await this.usersService.createUser(dto);
    }

    @Put('users/:userId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Update user' })
    async update(@Param() { userId }: UserParams, @Body() dto: UpdateUserDto): Promise<User | null> {
        return await this.usersService.updateUser(userId, dto);
    }

    @Delete('users/:userId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Delete user' })
    async delete(@Param() { userId }: UserParams): Promise<User | null> {
        return await this.usersService.deleteUser(userId);
    }
}
