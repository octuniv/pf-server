import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { faker } from '@faker-js/faker';
import {
  MakeBoardDtoFaker,
  MakeBoardDtoHasOnlySubtitleFaker,
  MakeBoardDtoHasOnlyTitleFaker,
  MakeHistoryDtoFaker,
} from './faker/board.fakers';

const mockBoardsService = () => ({
  create: jest.fn(),
  insertHistory: jest.fn(),
  findAll: jest.fn(),
  findBoard: jest.fn(),
  findHistory: jest.fn(),
  update: jest.fn(),
  updateHistory: jest.fn(),
  removeHistory: jest.fn(),
  removeBoard: jest.fn(),
});

const makeUUID = () => faker.string.uuid();
const makeId = () => faker.number.int({ min: 0, max: 100 });

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        {
          provide: BoardsService,
          useValue: mockBoardsService(),
        },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('sholud call create function with valid property', async () => {
      const createBoardDto = MakeBoardDtoFaker();
      await controller.create(createBoardDto);
      expect(service.create).toHaveBeenCalledWith(createBoardDto);
    });
  });

  describe('insertHistory()', () => {
    it('should call insertHistory function with valid properties', async () => {
      const insertHistoryDto = MakeHistoryDtoFaker();
      const boardId = makeUUID();
      await controller.insertHistory(boardId, insertHistoryDto);
      expect(service.insertHistory).toHaveBeenCalledWith(
        boardId,
        insertHistoryDto,
      );
    });
  });

  describe('findAll()', () => {
    it('should call findAll function', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findBoard()', () => {
    it('should call findBoard funciton with valid property', async () => {
      const boardId = makeUUID();
      await controller.findBoard(boardId);
      expect(service.findBoard).toHaveBeenCalledWith(boardId);
    });
  });

  describe('findHistory()', () => {
    it('should call findHistory funciton with valid properties', async () => {
      const boardId = makeUUID();
      const histId = makeId();
      await controller.findHistory(boardId, histId);
      expect(service.findHistory).toHaveBeenCalledWith(boardId, histId);
    });
  });

  describe('update()', () => {
    it('should call update function with only subtitle property', async () => {
      const boardId = makeUUID();
      const updateBoardDtoWithOnlySubtitle = MakeBoardDtoHasOnlySubtitleFaker();
      await controller.update(boardId, updateBoardDtoWithOnlySubtitle);
      expect(service.update).toHaveBeenCalledWith(
        boardId,
        updateBoardDtoWithOnlySubtitle,
      );
    });

    it('should call update funciton with only title propety', async () => {
      const boardId = makeUUID();
      const updateBoardDtoWithOnlyTitle = MakeBoardDtoHasOnlyTitleFaker();
      await controller.update(boardId, updateBoardDtoWithOnlyTitle);
      expect(service.update).toHaveBeenCalledWith(
        boardId,
        updateBoardDtoWithOnlyTitle,
      );
    });
  });

  describe('updateHistory()', () => {
    it('should call updateHistory with valid property', async () => {
      const boardId = makeUUID();
      const histId = makeId();
      const historyDto = MakeHistoryDtoFaker();
      await controller.updateHistory(boardId, histId, historyDto);
      expect(service.updateHistory).toHaveBeenCalledWith(
        boardId,
        histId,
        historyDto,
      );
    });
  });

  describe('removeHistory()', () => {
    it('should call removeHistory with valid property', async () => {
      const boardId = makeUUID();
      const histId = makeId();
      await controller.removeHistory(boardId, histId);
      expect(service.removeHistory).toHaveBeenCalledWith(boardId, histId);
    });
  });

  describe('removeBoard()', () => {
    it('should call remove with valid property', async () => {
      const boardId = makeUUID();
      await controller.removeBoard(boardId);
      expect(service.removeBoard).toHaveBeenCalledWith(boardId);
    });
  });
});
