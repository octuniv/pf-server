import { Test, TestingModule } from '@nestjs/testing';
import { ParagraphsService } from './paragraphs.service';
import {
  MakeParagraphsFaker,
  MakeParagraphEntityFaker,
  FilterCreateParagraphDto,
  MakeUpdateParagraphDtoFaker,
} from './fakers/paragraph.fakers';
import { Repository } from 'typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PgPost } from './entities/pgPost.entity';

const initialParagraph = MakeParagraphEntityFaker();
const paragraphs = MakeParagraphsFaker();
const oneParagraph = paragraphs[0];

const MockParagraphRepository = () => ({
  save: jest.fn().mockResolvedValue(initialParagraph),
  find: jest.fn().mockResolvedValue(paragraphs),
  findOne: jest.fn().mockResolvedValue(oneParagraph),
  findOneBy: jest.fn().mockResolvedValue(oneParagraph),
  delete: jest.fn(),
});

const MockPgPostRepositort = () => ({
  create: jest.fn(),
});

describe('ParagraphsService', () => {
  let service: ParagraphsService;
  let paragraphRepository: Repository<Paragraph>;
  let pgPostRepository: Repository<PgPost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParagraphsService,
        {
          provide: getRepositoryToken(Paragraph),
          useValue: MockParagraphRepository(),
        },
        {
          provide: getRepositoryToken(PgPost),
          useValue: MockPgPostRepositort(),
        },
      ],
    }).compile();

    service = module.get<ParagraphsService>(ParagraphsService);
    paragraphRepository = module.get<Repository<Paragraph>>(
      getRepositoryToken(Paragraph),
    );
    pgPostRepository = module.get<Repository<PgPost>>(
      getRepositoryToken(PgPost),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert an init paragraph', async () => {
      const repoSpy = jest.spyOn(paragraphRepository, 'save');
      const paragraph = FilterCreateParagraphDto(MakeUpdateParagraphDtoFaker());
      const createResult = await service.create(paragraph);
      expect(createResult).toEqual(initialParagraph);
      expect(repoSpy).toHaveBeenCalledWith(paragraph);
    });
  });

  describe('findAll()', () => {
    it('should return an array of paragraphs', async () => {
      const repoSpy = jest.spyOn(paragraphRepository, 'find');
      const paragraphs = await service.findAll();
      expect(paragraphs).toEqual(paragraphs);
      expect(repoSpy).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should get a single paragraph', () => {
      const repoSpy = jest.spyOn(paragraphRepository, 'findOne');
      const id = oneParagraph.id;
      expect(service.findOne(id)).resolves.toEqual(oneParagraph);
      expect(repoSpy).toHaveBeenCalledWith({
        where: {
          id: id,
        },
        relations: {
          posts: true,
        },
      });
    });
  });

  describe('update()', () => {
    it('should call to update a paragraph', async () => {
      const id = oneParagraph.id;
      const updateParagDto = MakeUpdateParagraphDtoFaker();
      await service.update(id, updateParagDto);
      expect(paragraphRepository.findOneBy).toHaveBeenCalledWith({ id: id });
      expect(pgPostRepository.create).toHaveBeenCalledTimes(3);
      expect(paragraphRepository.save).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should call to remove a paragraph', async () => {
      const repoSpy = jest.spyOn(paragraphRepository, 'delete');
      const id = oneParagraph.id;
      const retVal = await service.remove(id);
      expect(repoSpy).toHaveBeenCalledWith(id);
      expect(retVal).toBeUndefined();
    });
  });
});
