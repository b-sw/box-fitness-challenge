import { Activity as ActualActivity, CreateActivityDto, User as ActualUser, uuid } from '@box-fc/util-types';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { ActivitiesService } from './activities.service';

type TestUser = Omit<ActualUser, 'role'>;
type TestActivity = Omit<ActualActivity, 'user'>;

describe('ActivitiesService', () => {
    const userIdStub = 'userId';
    const anotherUserIdStub = 'anotherUserId';
    const activityIdStub = 'activityId';
    const durationStub = 1;
    const activityDtoStub: CreateActivityDto = {
        userId: userIdStub,
        trainingDate: new Date(),
        duration: durationStub,
        registrationDate: new Date(),
        type: 'type',
    };
    const activityStub = { ...activityDtoStub, id: activityIdStub };
    const teamStub1 = 'team1';
    const teamStub2 = 'team2';

    let activityRepository: Repository<Activity>;
    let userRepository: Repository<User>;
    let service: ActivitiesService;
    let module: TestingModule;

    beforeEach(async () => {
        await initializeModule();
        setRepositories();
        setService();
        await stubUserRepository();
    });

    it('should create an activity', async () => {
        const createdActivity = await service.createActivity(activityDtoStub);

        expect(createdActivity).toEqual({ ...activityDtoStub, id: expect.any(String) });
    });

    it('should persist an activity', async () => {
        await service.createActivity(activityDtoStub);

        expect(await activityRepository.find()).toEqual([{ ...activityDtoStub, id: expect.any(String) }]);
    });

    it('should get an activity', async () => {
        await activityRepository.insert(activityStub);

        const activity = await service.getActivityById(activityIdStub);

        expect(activity).toEqual(activityStub);
    });

    it('should not get a non-existent activity', async () => {
        const activity = await service.getActivityById(activityIdStub);

        expect(activity).toEqual(null);
    });

    it('should get all activities', async () => {
        const activityStub2 = { ...activityDtoStub, id: 'anotherActivityId' };
        await activityRepository.insert(activityStub);
        await activityRepository.insert(activityStub2);

        const activities = await service.getAllActivities();

        expect(activities).toEqual([activityStub, activityStub2]);
    });

    it('should get all activities for a user', async () => {
        const anotherUserActivityStub = { ...activityDtoStub, id: 'anotherActivityId', userId: anotherUserIdStub };
        await activityRepository.insert(activityStub);
        await activityRepository.insert(anotherUserActivityStub);

        const userActivities = await service.getUserActivities(userIdStub);

        expect(userActivities).toEqual([activityStub]);
    });

    it('should get accumulated user activity', async () => {
        const [startDateStub, endDateStub] = [new Date(), new Date()];
        await stubMultipleUsersActivities(startDateStub, endDateStub);

        const accumulatedActivity = await service.getAccumulatedUserActivity(userIdStub, startDateStub, endDateStub);

        expect(accumulatedActivity).toEqual({ userId: userIdStub, activeTime: 3, activitiesCount: 2 });
    });

    it('should get accumulated users activities', async () => {
        const [startDateStub, endDateStub] = [new Date(), new Date()];
        await stubMultipleUsersActivities(startDateStub, endDateStub);

        const accumulatedActivities = await service.getAccumulatedUsersActivities(startDateStub, endDateStub);

        expect(accumulatedActivities).toEqual([
            { userId: userIdStub, activeTime: 3, activitiesCount: 2 },
            { userId: anotherUserIdStub, activeTime: 4, activitiesCount: 1 },
        ]);
    });

    it('should get accumulated teams activities', async () => {
        const [startDateStub, endDateStub] = [new Date(), new Date()];
        await stubMultipleUsersActivities(startDateStub, endDateStub);

        const accumulatedActivities = await service.getAccumulatedTeamsActivities(startDateStub, endDateStub);

        expect(accumulatedActivities).toEqual([
            { team: teamStub1, activeTime: 3, activitiesCount: 2 },
            { team: teamStub2, activeTime: 4, activitiesCount: 1 },
        ]);
    });

    it('should update activity', async () => {
        await activityRepository.insert(activityStub);

        const updatedActivity = await service.updateActivity(activityIdStub, { duration: durationStub + 1 });

        expect(updatedActivity).toEqual({ ...activityStub, duration: durationStub + 1 });
    });

    it('should persist updated activity', async () => {
        await activityRepository.insert(activityStub);

        await service.updateActivity(activityIdStub, { duration: durationStub + 1 });

        expect(await activityRepository.find()).toEqual([{ ...activityStub, duration: durationStub + 1 }]);
    });

    it('should not update non-existent activity', async () => {
        const updatedActivity = await service.updateActivity(activityIdStub, { duration: durationStub + 1 });

        expect(updatedActivity).toEqual(null);
    });

    it('should delete activity', async () => {
        await activityRepository.insert(activityStub);

        const deletedActivity = await service.deleteActivity(activityIdStub);

        expect(deletedActivity).toEqual(activityStub);
    });

    it('should persist deleted activity', async () => {
        await activityRepository.insert(activityStub);

        await service.deleteActivity(activityIdStub);

        expect(await activityRepository.find()).toEqual([]);
    });

    it('should not delete non-existent activity', async () => {
        const deletedActivity = await service.deleteActivity(activityIdStub);

        expect(deletedActivity).toEqual(null);
    });

    async function initializeModule(): Promise<void> {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [User, Activity],
                    dropSchema: true,
                    synchronize: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([User, Activity]),
            ],
            providers: [ActivitiesService],
        }).compile();
    }

    function setRepositories(): void {
        activityRepository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    }

    function setService(): void {
        service = module.get<ActivitiesService>(ActivitiesService);
    }

    async function stubUserRepository(): Promise<void> {
        const baseUserStub = {
            firstName: 'firstName',
            lastName: 'lastName',
            division: 'division',
            role: 'role',
        };
        await userRepository.insert({ id: userIdStub, email: 'email1', ...baseUserStub, team: teamStub1 });
        await userRepository.insert({ id: anotherUserIdStub, email: 'email2', ...baseUserStub, team: teamStub2 });
    }

    async function stubMultipleUsersActivities(startDate: Date, endDate: Date): Promise<void> {
        const anotherDateStub = new Date().setHours(endDate.getHours() + 1);
        const activityStub1 = { ...activityDtoStub, id: 'id1', duration: 1, trainingDate: startDate };
        const activityStub2 = { ...activityDtoStub, id: 'id2', duration: 2, trainingDate: endDate };
        const activityStub3 = { ...activityDtoStub, id: 'id3', duration: 3, trainingDate: anotherDateStub };
        const anotherUserActivityStub = {
            ...activityDtoStub,
            id: 'id4',
            userId: anotherUserIdStub,
            duration: 4,
            trainingDate: endDate,
        };
        await activityRepository.insert([activityStub1, activityStub2, activityStub3, anotherUserActivityStub]);
    }
});

@Entity()
class User implements TestUser {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    team: string;

    @Column()
    division: string;

    @Column()
    role: string;
}

@Entity()
export class Activity implements TestActivity {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column()
    type: string;

    @Column()
    duration: number;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    trainingDate: Date;

    @Column({ type: 'datetime' })
    @Type(() => Date)
    registrationDate: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
