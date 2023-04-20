import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class AccumulatedActivityDto {
    @ApiProperty({ type: Date })
    @IsDate()
    startDate: Date;

    @ApiProperty({ type: Date })
    @IsDate()
    endDate: Date;
}
