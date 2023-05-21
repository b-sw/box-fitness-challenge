import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { Place } from '../../place';
import { uuid } from '../../uuid.type';

export class CreateWinnerDto {
    @ApiProperty({ type: String })
    @IsUUID()
    userId: uuid;

    @ApiProperty({ type: String })
    @IsUUID()
    weekId: uuid;

    @ApiProperty()
    @IsEnum(Place)
    place: Place;
}
