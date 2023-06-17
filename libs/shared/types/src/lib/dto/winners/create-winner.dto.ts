import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsUUID } from 'class-validator';
import { PodiumPlace } from '../../podium-place';
import { uuid } from '../../uuid.type';

export class CreateWinnerDto {
    @ApiProperty({ type: String })
    @IsUUID()
    userId: uuid;

    @ApiProperty({ type: Date, nullable: false })
    @IsDateString()
    date: Date;

    @ApiProperty()
    @IsEnum(PodiumPlace)
    podiumPlace: PodiumPlace;
}
