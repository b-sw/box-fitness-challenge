import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ActivityDto {
    @ApiProperty({ type: Date })
    @IsDateString()
    startDate: Date;

    @ApiProperty({ type: Date })
    @IsDateString()
    endDate: Date;
}
