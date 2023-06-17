import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class WeekWinnerDto {
    @ApiProperty({ type: Date })
    @IsDateString()
    date: Date;
}
