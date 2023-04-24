import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ type: String })
    googleToken: string;
}

export class AuthDevDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    devPassword: string;
}
