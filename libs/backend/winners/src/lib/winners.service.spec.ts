import { Place, User as ActualUser, uuid, Week, Winner as ActualWinner } from '@box-fc/shared/types';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { WinnersService } from './winners.service';

type TestUser = Omit<ActualUser, 'role'>;
type TestWinner = Omit<ActualWinner, 'user' | 'place'>;

describe('WinnersService', () => {
    const userIdStub = 'userId';
    const anotherUserIdStub = 'anotherUserIdStub';
    const weekIdStub = 'weekId';
    const anotherWeekIdStub = 'anotherWeekId';
    const firstPlaceStub = Place.First;
    const secondPlaceStub = Place.Second;
    const createWinnerDto = { userId: userIdStub, weekId: weekIdStub, place: firstPlaceStub };

    let yesterday: Date;
    let today: Date;
    let tomorrow: Date;

    let weeksRepository: Repository<Week>;
    let usersRepository: Repository<User>;
    let winnersRepository: Repository<Winner>;
    let module: TestingModule;
    let service: WinnersService;

    beforeEach(async () => {
        await initializeModule();
        setRepositories();
        setService();

        stubDates();
        await stubRepositories();
    });

    it('creates a winner', async () => {
        const winner = await service.create(createWinnerDto);

        expect(winner).toEqual({ id: expect.any(String), ...createWinnerDto });
    });

    it('persists a winner', async () => {
        await service.create(createWinnerDto);

        const winner = await winnersRepository.find();
        expect(winner).toEqual([{ id: expect.any(String), ...createWinnerDto }]);
    });

    it('gets all winners', async () => {
        const anotherWinnerDto = { userId: anotherUserIdStub, weekId: weekIdStub, place: secondPlaceStub };

        await service.create(createWinnerDto);
        await service.create(anotherWinnerDto);

        const winners = await service.getAll();
        expect(winners).toEqual([
            { id: expect.any(String), ...createWinnerDto },
            { id: expect.any(String), ...anotherWinnerDto },
        ]);
    });

    it('deletes a winner', async () => {
        const winnerIdStub = 'winnerId';
        await winnersRepository.insert({ id: winnerIdStub, ...createWinnerDto });

        const deletedWinner = await service.delete(winnerIdStub);

        expect(deletedWinner).toEqual({ id: winnerIdStub, ...createWinnerDto });
        expect(await winnersRepository.find()).toEqual([]);
    });

    it('does not delete non-existent winner', async () => {
        const throws = async () => await service.delete('non-existent-id');

        await expect(throws()).rejects.toThrow();
    });

    it('gets weeks', async () => {
        const weeks = await service.getWeeks();

        expect(weeks).toEqual([]);
    });

    async function initializeModule(): Promise<void> {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [User, Week, Winner],
                    dropSchema: true,
                    synchronize: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([User, Week, Winner]),
            ],
            providers: [WinnersService],
        }).compile();
    }

    function setRepositories(): void {
        usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
        weeksRepository = module.get<Repository<Week>>(getRepositoryToken(Week));
        winnersRepository = module.get<Repository<Winner>>(getRepositoryToken(Winner));
    }

    function setService(): void {
        service = module.get<WinnersService>(WinnersService);
    }

    function stubDates(): void {
        yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setUTCHours(12);
        today = new Date();
        today.setUTCHours(12);
        tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setUTCHours(12);
    }

    async function stubRepositories(): Promise<void> {
        await stubUsersRepository();
        await stubWeeksRepository();
    }

    async function stubUsersRepository(): Promise<void> {
        const baseUserStub = { firstName: 'fName', lastName: 'lName', division: 'div', role: 'role', team: 'team' };

        await usersRepository.insert({ id: userIdStub, email: 'email1', ...baseUserStub });
        await usersRepository.insert({ id: anotherUserIdStub, email: 'email2', ...baseUserStub });
    }

    async function stubWeeksRepository(): Promise<void> {
        await weeksRepository.insert({ id: anotherWeekIdStub, startDate: today, endDate: tomorrow });
        await weeksRepository.insert({ id: weekIdStub, startDate: yesterday, endDate: today });
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

    @Column({ nullable: true })
    team?: string;

    @Column({ nullable: true })
    division?: string;

    @Column()
    role: string;

    @Column({ nullable: true })
    imageUrl: string;
}

@Entity()
class Winner implements TestWinner {
    @PrimaryGeneratedColumn('uuid')
    id: uuid;

    @Column()
    userId: uuid;

    @Column()
    weekId: uuid;

    @Column()
    place: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Week, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'weekId' })
    week: Week;
}
