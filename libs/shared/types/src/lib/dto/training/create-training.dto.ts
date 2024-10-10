import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { uuid } from '../../uuid.type';

export class CreateTrainingDto {
    @ApiProperty({ type: String })
    @IsUUID()
    userId: uuid;

    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    type: string;

    @ApiProperty()
    @Min(0.1)
    @Max(999)
    distance: number;

    @ApiProperty({ type: Date, nullable: false })
    @IsDateString()
    trainingDate: Date;
}
