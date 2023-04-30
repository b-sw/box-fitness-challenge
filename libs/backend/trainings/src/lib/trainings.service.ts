import {
    CreateTrainingDto,
    Optional,
    TeamActivity,
    Training,
    UpdateTrainingDto,
    User,
    UserActivity,
} from '@box-fc/shared/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatesTraining, DeletesTraining, GetsTrainings, UpdatesTraining } from './interfaces';

type UserId = Training['userId'];
type Team = User['team'];

@Injectable()
export class TrainingsService implements CreatesTraining, GetsTrainings, UpdatesTraining, DeletesTraining {
    constructor(
        @InjectRepository(Training) private trainingsRepository: Repository<Training>,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    createTraining(createTrainingDto: CreateTrainingDto): Promise<Training> {
        const training = this.trainingsRepository.create(createTrainingDto);

        return this.trainingsRepository.save(training);
    }

    getAllTrainings(): Promise<Training[]> {
        return this.trainingsRepository.find();
    }

    getTrainingById(trainingId: Training['id']): Promise<Optional<Training>> {
        return this.trainingsRepository.findOne({ where: { id: trainingId } });
    }

    getUserTrainings(userId: UserId): Promise<Training[]> {
        return this.trainingsRepository.find({ where: { userId: userId } });
    }

    async getUserActivity(userId: UserId, startDate: Date, endDate: Date): Promise<UserActivity> {
        const trainings = await this.trainingsRepository.find({
            where: { userId: userId, trainingDate: Between(startDate, endDate) },
        });
        const activeTime = trainings.reduce((acc, { duration }) => acc + duration, 0);
        const trainingsCount = trainings.length;

        return { userId, activeTime, trainingsCount };
    }

    async getAllUsersActivities(startDate: Date, endDate: Date): Promise<UserActivity[]> {
        const trainings = await this._getTrainingsInRange(startDate, endDate);
        const usersActivities = trainings.reduce((acc, { userId, duration }) => {
            acc.set(userId, {
                userId,
                activeTime: (acc.get(userId)?.activeTime ?? 0) + duration,
                trainingsCount: (acc.get(userId)?.trainingsCount ?? 0) + 1,
            });

            return acc;
        }, new Map<UserId, UserActivity>());

        return Array.from(usersActivities.values());
    }

    async getAllTeamsActivities(startDate: Date, endDate: Date): Promise<TeamActivity[]> {
        const trainings = await this._getTrainingsInRange(startDate, endDate);
        const users = await this.usersRepository.find();
        const usersTeams = new Map(users.map(({ id, team }) => [id, team]));
        const accumulatedTeamsActivities = trainings.reduce((acc, { userId, duration }) => {
            const team = usersTeams.get(userId) as Team;

            acc.set(team, {
                team,
                activeTime: (acc.get(team)?.activeTime ?? 0) + duration,
                trainingsCount: (acc.get(team)?.trainingsCount ?? 0) + 1,
            });

            return acc;
        }, new Map<Team, TeamActivity>());

        return Array.from(accumulatedTeamsActivities.values());
    }

    async updateTraining(
        trainingId: Training['id'],
        updateTrainingDto: UpdateTrainingDto,
    ): Promise<Optional<Training>> {
        await this.trainingsRepository.update(trainingId, updateTrainingDto);

        return await this.getTrainingById(trainingId);
    }

    async deleteTraining(trainingId: Training['id']): Promise<Optional<Training>> {
        const training = await this.getTrainingById(trainingId);

        await this.trainingsRepository.delete(trainingId);

        return training;
    }

    private _getTrainingsInRange(startDate: Date, endDate: Date): Promise<Training[]> {
        return this.trainingsRepository.find({ where: { trainingDate: Between(startDate, endDate) } });
    }
}
