import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from 'libs/util-types/src/lib/dto/activity/create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
