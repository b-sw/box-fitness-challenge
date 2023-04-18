import { JwtGuard } from '@box-fc/data-access-guards';
import { Role, User } from '@box-fc/types';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from './guards/roles/admin.guard';
import { UserParams } from './params/user.params';
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
        return this.usersService.getAll();
    }

    @Get('users/admins')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all admins' })
    async getAllAdmins(): Promise<User[]> {
        return this.usersService.getByRole(Role.Admin);
    }

    @Get('users/employees')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all employees' })
    async getAllReferees(): Promise<User[]> {
        return this.usersService.getByRole(Role.Employee);
    }

    @Get('users/:userId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get user by id' })
    async getById(@Param() params: UserParams): Promise<User | null> {
        return await this.usersService.getById(params.userId);
    }

    @Post('users')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() dto: CreateUserDto): Promise<User | null> {
        return await this.usersService.create(dto);
    }

    @Put('users/:userId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Update user' })
    async update(@Param() params: UserParams, @Body() dto: UpdateUserDto): Promise<User | null> {
        return await this.usersService.update(params, dto);
    }

    @Delete('users/:userId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Delete user' })
    async remove(@Param() params: UserParams): Promise<User | null> {
        return await this.usersService.remove(params);
    }
}
