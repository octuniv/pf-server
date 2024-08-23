import { Test, TestingModule } from '@nestjs/testing';
import { ParagraphsService } from './paragraphs.service';
import {
  MakeParagraphDtoFaker,
  MakeParagraphEntityFaker,
} from './fakers/paragraph.fakers';
import { Repository } from 'typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const paragraphsList = Array(5)
  .fill('')
  .map(() => MakeParagraphEntityFaker());

const oneParagraph = MakeParagraphEntityFaker();

const MockParagraphRepository = () => ({
  save: jest.fn().mockResolvedValue(oneParagraph),
  find: jest.fn().mockResolvedValue(paragraphsList),
  findOneBy: jest.fn().mockResolvedValue(oneParagraph),
  update: jest.fn(),
  delete: jest.fn(),
});
describe('ParagraphsService', () => {
  let service: ParagraphsService;
  let repository: Repository<Paragraph>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParagraphsService,
        {
          provide: getRepositoryToken(Paragraph),
          useValue: MockParagraphRepository(),
        },
      ],
    }).compile();

    service = module.get<ParagraphsService>(ParagraphsService);
    repository = module.get<Repository<Paragraph>>(
      getRepositoryToken(Paragraph),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully inser a paragraph', () => {
      const paragraph = { ...oneParagraph };
      expect(service.create(paragraph)).resolves.toEqual(oneParagraph);
    });
  });

  describe('findAll()', () => {
    it('should return an array of paragraphs', async () => {
      const paragraphs = await service.findAll();
      expect(paragraphs).toEqual(paragraphsList);
    });
  });

  describe('findOne()', () => {
    it('should get a single paragraph', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      const id = oneParagraph.id;
      expect(service.findOne(id)).resolves.toEqual(oneParagraph);
      expect(repoSpy).toHaveBeenCalledWith({ id: id });
    });
  });

  describe('update()', () => {
    it('should call to update a paragraph', async () => {
      const repoSpy = jest.spyOn(repository, 'update');
      const id = oneParagraph.id;
      const updateParagDto = MakeParagraphDtoFaker();
      const retVal = await service.update(id, updateParagDto);
      expect(repoSpy).toHaveBeenCalledWith(id, updateParagDto);
      expect(retVal).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it('should call to remove a paragraph', async () => {
      const repoSpy = jest.spyOn(repository, 'delete');
      const id = oneParagraph.id;
      const retVal = await service.remove(id);
      expect(repoSpy).toHaveBeenCalledWith(id);
      expect(retVal).toBeUndefined();
    });
  });
});
