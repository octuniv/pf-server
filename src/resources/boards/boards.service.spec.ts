import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { History } from './entities/history.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MakeBoardDtoFaker,
  MakeBoardEntityFaker,
  MakeHistoryDtoFaker,
  MakeHistoryEntityFaker,
} from './faker/board.fakers';
import { boardDtoToEntity } from './util/boards.utils';
import { faker } from '@faker-js/faker';

const returnBoardEntity = MakeBoardEntityFaker();
const returnHistoryEntity = MakeHistoryEntityFaker();

const MockBoardRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn().mockResolvedValue(returnBoardEntity),
  update: jest.fn(),
  remove: jest.fn(),
});

const MockHistoryRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn().mockResolvedValue(returnHistoryEntity),
  remove: jest.fn(),
});

const makeUUID = () => faker.string.uuid();
const makeId = () => faker.number.int({ min: 1, max: 100 });

describe('BoardsService', () => {
  let service: BoardsService;
  let boardRepository: Repository<Board>;
  let historyRepository: Repository<History>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useValue: MockBoardRepository(),
        },
        {
          provide: getRepositoryToken(History),
          useValue: MockHistoryRepository(),
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
    historyRepository = module.get<Repository<History>>(
      getRepositoryToken(History),
    );
  });

  afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call save function in boardRepo successfully', async () => {
      const dto = MakeBoardDtoFaker();
      await service.create(dto);
      expect(boardRepository.save).toHaveBeenCalledWith(boardDtoToEntity(dto));
    });
  });

  describe('findAll()', () => {
    it('should call find funciton in boardRepo successfully', async () => {
      await service.findAll();
      expect(boardRepository.find).toHaveBeenCalledWith({
        relations: {
          historys: {
            intros: true,
            contents: true,
          },
        },
      });
    });
  });

  describe('findBoard()', () => {
    it('should call findOne function in boardRepo successfully', async () => {
      const boardId = makeUUID();
      expect(service.findBoard(boardId)).resolves.toEqual(returnBoardEntity);
      expect(boardRepository.findOne).toHaveBeenCalledWith({
        where: { id: boardId },
        relations: {
          historys: {
            intros: true,
            contents: true,
          },
        },
      });
    });
  });

  describe('findHistory()', () => {
    it('should call findOne function in histRepo successfully', async () => {
      const [boardId, histId] = [makeUUID(), makeId()];
      expect(service.findHistory(boardId, histId)).resolves.toEqual(
        returnHistoryEntity,
      );
      expect(historyRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: histId,
          board_id: boardId,
        },
        relations: {
          intros: true,
          contents: true,
        },
      });
    });
  });

  describe('insertHistory()', () => {
    it('should insert an history belong to correct board', async () => {
      const boardId = makeUUID();
      const histDto = MakeHistoryDtoFaker();
      const findBoardSpy = jest.spyOn(service, 'findBoard');
      await service.insertHistory(boardId, histDto);
      expect(findBoardSpy).toHaveBeenCalledWith(boardId);
      expect(historyRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should update a board', async () => {
      const boardId = makeUUID();
      const boardDto = MakeBoardDtoFaker();
      const findBoardSpy = jest.spyOn(service, 'findBoard');
      await service.update(boardId, boardDto);
      expect(findBoardSpy).toHaveBeenCalledWith(boardId);
      expect(boardRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateHistory()', () => {
    it('should update an history belong to correct board', async () => {
      const boardId = makeUUID();
      const histId = makeId();
      const histDto = MakeHistoryDtoFaker();
      const findHistorySpy = jest.spyOn(service, 'findHistory');
      await service.updateHistory(boardId, histId, histDto);
      expect(findHistorySpy).toHaveBeenCalledWith(boardId, histId);
      expect(historyRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeHistory()', () => {
    it('should delete an history belong to correct board', async () => {
      const boardId = makeUUID();
      const histId = makeId();
      const findHistorySpy = jest.spyOn(service, 'findHistory');
      await service.removeHistory(boardId, histId);
      expect(findHistorySpy).toHaveBeenCalledWith(boardId, histId);
      expect(historyRepository.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove()', () => {
    it('should remove a board', async () => {
      const boardId = makeUUID();
      const findBoardSpy = jest.spyOn(service, 'findBoard');
      await service.removeBoard(boardId);
      expect(findBoardSpy).toHaveBeenCalledWith(boardId);
      expect(boardRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
