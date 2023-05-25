import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID, Length, Max, Min } from 'class-validator';
import { uuid } from '../../uuid.type';

export class CreateTrainingDto {
    @ApiProperty({ type: String })
    @IsUUID()
    userId: uuid;

    @ApiProperty()
    @Length(3, 20)
    type: string;

    @ApiProperty()
    @Min(1)
    @Max(180)
    duration: number;

    @ApiProperty({ type: Date, nullable: false })
    @IsDateString()
    trainingDate: Date;
}
