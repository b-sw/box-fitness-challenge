import { JwtGuard } from '@box-fc/util-guards';
import {
    AccumulatedActivityDto,
    AccumulatedTeamActivity,
    AccumulatedUserActivity,
    Activity,
    ActivityParams,
    CreateActivityDto,
    Optional,
    UpdateActivityDto,
    UserParams,
} from '@box-fc/util-types';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';

@ApiTags('activities')
@Controller('')
@ApiBearerAuth()
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post('activities')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Create an activity' })
    createActivity(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.createActivity(createActivityDto);
    }

    @Get('activities')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all activities' })
    getAll() {
        return this.activitiesService.getAllActivities();
    }

    @Get('activities/:activityId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get activity by id' })
    getById(@Param() { activityId }: ActivityParams): Promise<Optional<Activity>> {
        return this.activitiesService.getActivityById(activityId);
    }

    @Post('activities/:activityId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Update an activity' })
    updateActivity(
        @Param() { activityId }: ActivityParams,
        @Body() updateActivityDto: UpdateActivityDto,
    ): Promise<Optional<Activity>> {
        return this.activitiesService.updateActivity(activityId, updateActivityDto);
    }

    @Delete('activities/:activityId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Delete an activity' })
    deleteActivity(@Param() { activityId }: ActivityParams) {
        return this.activitiesService.deleteActivity(activityId);
    }

    @Get('activities/users/:userId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get user activities' })
    getUserActivities(@Param() { userId }: UserParams): Promise<Activity[]> {
        return this.activitiesService.getUserActivities(userId);
    }

    @Post('activities/user/:userId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get user accumulated activity' })
    getAccumulatedUserActivity(
        @Param() { userId }: UserParams,
        @Body() dto: AccumulatedActivityDto,
    ): Promise<AccumulatedUserActivity> {
        return this.activitiesService.getAccumulatedUserActivity(userId, dto.startDate, dto.endDate);
    }

    @Post('activities/users')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all users accumulated activities' })
    getAccumulatedUsersActivities(@Body() dto: AccumulatedActivityDto): Promise<AccumulatedUserActivity[]> {
        return this.activitiesService.getAccumulatedUsersActivities(dto.startDate, dto.endDate);
    }

    @Post('activities/teams')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all teams accumulated activities' })
    getAccumulatedTeamsActivities(@Body() dto: AccumulatedActivityDto): Promise<AccumulatedTeamActivity[]> {
        return this.activitiesService.getAccumulatedTeamsActivities(dto.startDate, dto.endDate);
    }
}
