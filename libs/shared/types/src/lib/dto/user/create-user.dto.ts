import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, Length, MaxLength } from 'class-validator';
import { Role } from '../../role.type';

export class CreateUserDto {
    @ApiProperty()
    @Length(5, 50)
    email: string;

    @ApiProperty()
    @MaxLength(15, { message: 'First name too long.' })
    firstName: string;

    @ApiProperty()
    @MaxLength(15, { message: 'Last name too long.' })
    lastName: string;

    @ApiProperty()
    @MaxLength(15, { message: 'Team name too long.' })
    @IsOptional()
    team?: string;

    @ApiProperty()
    @MaxLength(15, { message: 'Division name too long.' })
    @IsOptional()
    division?: string;

    @ApiProperty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    imageUrl: string;
}
