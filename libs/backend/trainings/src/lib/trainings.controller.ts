import { AdminGuard, JwtGuard, SelfGuard } from '@box-fc/backend/guards';
import {
    ActivityDto,
    CreateTrainingDto,
    Optional,
    TeamActivity,
    Training,
    TrainingParams,
    UpdateTrainingDto,
    UserActivity,
    UserParams,
} from '@box-fc/shared/types';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TrainingsService } from './trainings.service';

@ApiTags('trainings')
@Controller('')
@ApiBearerAuth()
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) {}

    @Post('trainings')
    @UseGuards(JwtGuard, SelfGuard)
    @ApiOperation({ summary: 'Create an training' })
    createTraining(@Body() dto: CreateTrainingDto) {
        return this.trainingsService.createTraining(dto);
    }

    @Get('trainings')
    @ApiOperation({ summary: 'Get all trainings' })
    getAll() {
        return this.trainingsService.getAllTrainings();
    }

    @Get('trainings/:trainingId')
    @ApiOperation({ summary: 'Get training by id' })
    getById(@Param() { trainingId }: TrainingParams): Promise<Optional<Training>> {
        return this.trainingsService.getTrainingById(trainingId);
    }

    @Post('trainings/:trainingId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Update an training' })
    updateTraining(
        @Param() { trainingId }: TrainingParams,
        @Body() dto: UpdateTrainingDto,
    ): Promise<Optional<Training>> {
        return this.trainingsService.updateTraining(trainingId, dto);
    }

    @Delete('trainings/:trainingId')
    @UseGuards(JwtGuard, AdminGuard)
    @ApiOperation({ summary: 'Delete an training' })
    deleteTraining(@Param() { trainingId }: TrainingParams) {
        return this.trainingsService.deleteTraining(trainingId);
    }

    @Get('trainings/users/:userId')
    @ApiOperation({ summary: 'Get user trainings' })
    getUserTrainings(@Param() { userId }: UserParams): Promise<Training[]> {
        return this.trainingsService.getUserTrainings(userId);
    }

    @Post('trainings/user/:userId')
    @ApiOperation({ summary: 'Get user accumulated training' })
    getUserActivity(@Param() { userId }: UserParams, @Body() dto: ActivityDto): Promise<UserActivity> {
        return this.trainingsService.getUserActivity(userId, dto.startDate, dto.endDate);
    }

    @Post('trainings/accumulated/users')
    @ApiOperation({ summary: 'Get all users accumulated trainings' })
    getUsersActivities(@Body() dto: ActivityDto): Promise<UserActivity[]> {
        return this.trainingsService.getAllUsersActivities(dto.startDate, dto.endDate);
    }

    @Post('trainings/accumulated/teams')
    @ApiOperation({ summary: 'Get all teams accumulated trainings' })
    getTeamsActivities(@Body() dto: ActivityDto): Promise<TeamActivity[]> {
        return this.trainingsService.getAllTeamsActivities(dto.startDate, dto.endDate);
    }
}
