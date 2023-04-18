import { Role, User as ActualUser, uuid } from '@box-fc/types';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { UsersService } from './users.service';

type TestUser = Omit<ActualUser, 'role'>;

@Entity()
export class User implements TestUser {
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

describe('UsersService', () => {
    const emailStub = 'email@stub.com';
    const firstNameStub = 'firstNameStub';
    const lastNameStub = 'lastNameStub';
    const teamStub = 'teamStub';
    const divisionStub = 'divisionStub';
    const roleStub = Role.Employee;
    const createUserDto = {
        email: emailStub,
        firstName: firstNameStub,
        lastName: lastNameStub,
        team: teamStub,
        division: divisionStub,
        role: roleStub,
    };

    let usersRepository: Repository<User>;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [User],
                    dropSchema: true,
                    synchronize: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [UsersService],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should create user', async () => {
        const user = await usersService.create(createUserDto);

        expect(user).toEqual(expect.objectContaining({ ...createUserDto, id: user.id }));
        expect(await usersRepository.findOne({ where: { id: user.id } })).toEqual(user);
    });

    it('should update user', async () => {
        const newEmailStub = 'new@emailStub.com';
        const userStub = usersRepository.create(createUserDto);
        await usersRepository.save(userStub);

        const updatedUser = await usersService.update({ userId: userStub.id }, { email: newEmailStub });

        expect(updatedUser).toEqual(expect.objectContaining({ ...createUserDto, email: newEmailStub }));
        expect(await usersRepository.findOne({ where: { id: userStub.id } })).toEqual(updatedUser);
    });

    it('should not update non-existing user', async () => {
        const newEmailStub = 'new@emailStub.com';
        const updatedUser = await usersService.update({ userId: 'non-existing-id' }, { email: newEmailStub });

        expect(updatedUser).toBeNull();
    });

    it('should delete user', async () => {
        const userStub = usersRepository.create(createUserDto);
        await usersRepository.save(userStub);

        const deletedUser = await usersService.remove({ userId: userStub.id });

        expect(deletedUser).toEqual(userStub);
        expect(await usersRepository.findOne({ where: { id: userStub.id } })).toBeNull();
    });

    it('should not delete non-existing user', async () => {
        const removedUser = await usersService.remove({ userId: 'non-existing-id' });

        expect(removedUser).toBeNull();
    });

    it('should get all users', async () => {
        const user1Stub = usersRepository.create(createUserDto);
        const user2Stub = usersRepository.create({ ...createUserDto, email: 'email2@stub.com' });
        await usersRepository.save(user1Stub);
        await usersRepository.save(user2Stub);

        const users = await usersService.getAll();

        expect(users).toEqual(expect.arrayContaining([user1Stub, user2Stub]));
    });

    it('should get user by id', async () => {
        const userStub = usersRepository.create(createUserDto);
        await usersRepository.save(userStub);

        const user = await usersService.getById(userStub.id);

        expect(user).toEqual(userStub);
    });

    it('should not get user by non-existing id', async () => {
        const user = await usersService.getById('non-existing-id');

        expect(user).toBeNull();
    });

    it('should get user by email', async () => {
        const userStub = usersRepository.create(createUserDto);
        await usersRepository.save(userStub);

        const user = await usersService.getByEmail(userStub.email);

        expect(user).toEqual(userStub);
    });

    it('should not get user by non-existing email', async () => {
        const user = await usersService.getByEmail('non-existing-email');

        expect(user).toBeNull();
    });

    it('should get users by role', async () => {
        const user1Stub = usersRepository.create(createUserDto);
        const user2Stub = usersRepository.create({ ...createUserDto, email: 'email2@stub.com', role: Role.Admin });
        await usersRepository.save(user1Stub);
        await usersRepository.save(user2Stub);

        const admins = await usersService.getByRole(Role.Admin);

        expect(admins).toEqual(expect.arrayContaining([user2Stub]));
    });
});
