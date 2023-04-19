import { JwtGuard } from '@box-fc/util-guards';
import { CreateActivityDto, UpdateActivityDto } from '@box-fc/util-types';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';

@ApiTags('activities')
@Controller('')
@ApiBearerAuth()
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post('activity')
    @UseGuards(JwtGuard)
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.createActivity(createActivityDto);
    }

    @UseGuards(JwtGuard)
    getAll() {
        return this.activitiesService.getAllActivities();
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    getById(@Param('id') id: string) {
        return this.activitiesService.getActivityById(id);
    }

    @Patch(':id')
    @UseGuards(JwtGuard)
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activitiesService.updateActivity(id, updateActivityDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    delete(@Param('id') id: string) {
        return this.activitiesService.deleteActivity(id);
    }
}
