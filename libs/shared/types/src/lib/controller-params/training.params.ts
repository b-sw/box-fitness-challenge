import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { uuid } from '../uuid.type';

export class TrainingParams {
    @ApiProperty({ type: String })
    @IsUUID()
    trainingId: uuid;
}
