import { Activity } from '@box-fc/util-types';
import { ModuleMocker } from 'jest-mock';
import { Repository } from 'typeorm';
import { ActivitiesService } from './activities.service';

const moduleMocker = new ModuleMocker(global);

describe('ActivitiesService', () => {
    let repository: Repository<Activity>;
    let service: ActivitiesService;

    // beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //         providers: [
    //             ActivitiesService,
    //             {
    //                 provide: getRepositoryToken(SportActivity),
    //                 useValue: createMock(getRepositoryToken(SportActivity)),
    //             },
    //             {
    //                 provide: UsersService,
    //                 useValue: createMock(UsersService),
    //             },
    //         ],
    //     }).compile();
    //
    //     repository = module.get<Repository<SportActivity>>(getRepositoryToken(SportActivity));
    //     service = module.get<ActivitiesService>(ActivitiesService);
    // });

    it.todo('should be defined', () => {
        expect(true).toBeTruthy();
    });
});
