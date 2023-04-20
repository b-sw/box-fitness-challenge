import { uuid } from '@box-fc/util-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserParams {
    @ApiProperty({ type: String })
    @IsUUID()
    userId: uuid;
}