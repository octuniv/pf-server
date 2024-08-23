import { Test, TestingModule } from '@nestjs/testing';
import { ParagraphsController } from './paragraphs.controller';
import { ParagraphsService } from './paragraphs.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import {
  MakeParagraphDtoFaker,
  MakeParagraphEntityFaker,
  MakeUUIDFaker,
} from './fakers/paragraph.fakers';
import { faker } from '@faker-js/faker';

const createParagAutoProperties = {
  id: MakeUUIDFaker(),
  craeteAt: faker.date.recent(),
};

const findOneParagEntity = MakeParagraphEntityFaker();

const MockParagraphsService = () => ({
  create: jest.fn().mockImplementation((parag: CreateParagraphDto) =>
    Promise.resolve({
      ...createParagAutoProperties,
      ...parag,
    }),
  ),
  findAll: jest.fn().mockResolvedValue(
    Array(3)
      .fill('')
      .map(() => MakeParagraphEntityFaker()),
  ),
  findOne: jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      ...findOneParagEntity,
      id,
    }),
  ),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('ParagraphsController', () => {
  let controller: ParagraphsController;
  let service: ParagraphsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParagraphsController],
      providers: [
        {
          provide: ParagraphsService,
          useValue: MockParagraphsService(),
        },
      ],
    }).compile();

    controller = module.get<ParagraphsController>(ParagraphsController);
    service = module.get<ParagraphsService>(ParagraphsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      const createParagDto = MakeParagraphDtoFaker();
      expect(controller.create(createParagDto)).resolves.toEqual({
        ...createParagAutoProperties,
        ...createParagDto,
      });
      expect(service.create).toHaveBeenCalledWith(createParagDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find an user', () => {
      const id = MakeUUIDFaker();
      expect(controller.findOne(id)).resolves.toEqual({
        ...findOneParagEntity,
        id,
      });
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should call to update an user', () => {
      const id = MakeUUIDFaker();
      const updateDto = MakeParagraphDtoFaker();
      controller.update(id, updateDto);
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove()', () => {
    it('should call to remove an user', () => {
      const id = MakeUUIDFaker();
      controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
