import { uuid } from '@box-fc/util-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ActivityParams {
    @ApiProperty({ type: String })
    @IsUUID()
    activityId: uuid;
}
