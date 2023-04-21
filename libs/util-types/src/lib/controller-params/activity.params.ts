import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { uuid } from '../uuid.type';

export class ActivityParams {
    @ApiProperty({ type: String })
    @IsUUID()
    activityId: uuid;
}
