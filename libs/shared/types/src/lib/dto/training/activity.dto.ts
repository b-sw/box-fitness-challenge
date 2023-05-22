import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class ActivityDto {
    @ApiProperty({ type: Date })
    @IsDate()
    startDate: Date;

    @ApiProperty({ type: Date })
    @IsDate()
    endDate: Date;
}
