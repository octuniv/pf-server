import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  MakeUUIDFaker,
  MakeUserDtoFaker,
  MakeUserFaker,
} from './fakers/user.fakers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocialSite } from './entities/socialsite.entity';

const userlist = [MakeUserFaker()];

const MockUserRepository = () => ({
  find: jest.fn().mockResolvedValue(userlist),
  findOneBy: jest.fn().mockResolvedValue(userlist[0]),
  save: jest.fn(),
});

const MockSocialSiteRepository = () => ({
  create: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let socialSiteRepository: Repository<SocialSite>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(SocialSite),
          useValue: MockSocialSiteRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    socialSiteRepository = module.get<Repository<SocialSite>>(
      getRepositoryToken(SocialSite),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return a userlist (but only one elem)', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userlist);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update an user', async () => {
      const userDto: UpdateUserDto = MakeUserDtoFaker();
      const uuid = MakeUUIDFaker();
      await service.update(uuid, userDto);
      expect(userRepository.findOneBy).toHaveBeenCalled();
      expect(socialSiteRepository.create).toHaveBeenCalledTimes(3);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });
});
