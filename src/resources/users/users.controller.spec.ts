import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  MakeCreateUserDtoFaker,
  MakeUUIDFaker,
  MakeUpdateUserDtoFaker,
} from './fakers/user.fakers';

const MockUsersServices = () => ({
  findAll: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: MockUsersServices(),
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all user (but has only one elem)', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should create a user', async () => {
      await usersController.create(MakeCreateUserDtoFaker());
      expect(usersService.create).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    let uuid: string;
    let userDto: UpdateUserDto;

    beforeEach(() => {
      userDto = MakeUpdateUserDtoFaker();
      uuid = MakeUUIDFaker();
      jest.resetAllMocks();
    });

    it('should update a user', async () => {
      await usersController.update(uuid, userDto);
      expect(usersService.update).toHaveBeenCalledWith(uuid, userDto);
    });
  });
});
