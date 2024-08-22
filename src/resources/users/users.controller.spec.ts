import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  MakeFakerUUID,
  MakeUserFakerDto,
  MakeUserFakerEntity,
} from './user.make.faker';
import { User } from './entities/user.entity';

const userEntity: User = MakeUserFakerEntity();

const MockUsersServices = () => ({
  findAll: jest.fn().mockResolvedValue(() => {
    return [userEntity];
  }),
  update: jest.fn(),
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

  describe('update()', () => {
    let uuid: string;
    let userDto: UpdateUserDto;

    beforeEach(() => {
      userDto = MakeUserFakerDto();
      uuid = MakeFakerUUID();
      jest.resetAllMocks();
    });

    it('should update a user', () => {
      usersController.update(uuid, userDto);
      expect(usersService.update).toHaveBeenCalled();
    });
  });
});
