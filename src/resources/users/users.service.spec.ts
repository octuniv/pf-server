import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  MakeUUIDFaker,
  MakeUserDtoFaker,
  MakeUserEntityFaker,
} from './fakers/user.fakers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

const userlist = [MakeUserEntityFaker()];

const MockUserRepository = () => ({
  find: jest.fn().mockResolvedValue(userlist),
  update: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return a userlist (but only one elem)', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userlist);
    });
  });

  describe('update()', () => {
    let userDto: UpdateUserDto;
    let uuid: string;

    beforeEach(() => {
      userDto = MakeUserDtoFaker();
      uuid = MakeUUIDFaker();
      jest.resetAllMocks();
    });

    it('should update an user', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      const retVal = await service.update(uuid, userDto);
      expect(retVal).toBeUndefined();
      expect(updateSpy).toHaveBeenCalledWith(uuid, userDto);
    });
  });
});
