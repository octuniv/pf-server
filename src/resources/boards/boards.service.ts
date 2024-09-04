import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { HistoryDto } from './dto/history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { HistoryIntro } from './entities/historyIntro.entity';
import { HistoryContent } from './entities/historyContent.entity';
import { boardDtoToEntity, historyDtoToEntity } from './util/boards.utils';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private BoardRepository: Repository<Board>,
    @InjectRepository(History)
    private HistoryReporisoty: Repository<History>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    return this.BoardRepository.save(boardDtoToEntity(createBoardDto));
  }

  async insertHistory(boardId: string, historyDto: HistoryDto) {
    const findBoard = await this.findBoard(boardId);
    if (!findBoard)
      throw new NotFoundException(`Board with id ${boardId} not found`);
    const historyEntity = historyDtoToEntity(historyDto);
    historyEntity.board = findBoard;
    return this.HistoryReporisoty.save(historyEntity);
  }

  async findAll() {
    return this.BoardRepository.find({
      relations: {
        historys: {
          intros: true,
          contents: true,
        },
      },
      order: {
        createAt: 'ASC',
        historys: {
          id: 'ASC',
          intros: {
            id: 'ASC',
          },
          contents: {
            id: 'ASC',
          },
        },
      },
    });
  }

  async findBoard(boardId: string) {
    return this.BoardRepository.findOne({
      where: { id: boardId },
      relations: {
        historys: {
          intros: true,
          contents: true,
        },
      },
      order: {
        historys: {
          id: 'ASC',
          intros: {
            id: 'ASC',
          },
          contents: {
            id: 'ASC',
          },
        },
      },
    });
  }

  async findHistory(boardId: string, historyId: number) {
    const findHistory = await this.HistoryReporisoty.findOne({
      where: {
        id: historyId,
        board_id: boardId,
      },
      relations: {
        intros: true,
        contents: true,
      },
      order: {
        intros: {
          id: 'ASC',
        },
        contents: {
          id: 'ASC',
        },
      },
    });

    if (!findHistory)
      throw new NotFoundException(
        `history with board ${boardId} and history ${historyId} not found`,
      );
    return findHistory;
  }

  async update(boardId: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findBoard(boardId);
    if (!board) throw new NotFoundException(`board with ${boardId} not found`);
    const updateBoardEntity = boardDtoToEntity(updateBoardDto);
    return this.BoardRepository.update(boardId, updateBoardEntity);
  }

  async updateHistory(
    boardId: string,
    historyId: number,
    updateHistoryDto: HistoryDto,
  ) {
    const history = await this.findHistory(boardId, historyId);
    if (!history)
      throw new NotFoundException(
        `history with board ${boardId} and hist ${historyId} not found`,
      );
    history.subtitle = updateHistoryDto.subtitle;
    history.intros = updateHistoryDto.intros.map((intro) => {
      const introEntity = new HistoryIntro();
      introEntity.intro = intro;
      return introEntity;
    });
    history.contents = updateHistoryDto.contents.map((content) => {
      const contentEntity = new HistoryContent();
      contentEntity.content = content;
      return contentEntity;
    });
    return this.HistoryReporisoty.save(history);
  }

  async removeHistory(boardId: string, historyId: number) {
    const history = await this.findHistory(boardId, historyId);
    if (!history)
      throw new NotFoundException(
        `history with board ${boardId} and hist ${historyId} not found`,
      );
    return this.HistoryReporisoty.remove(history);
  }

  async removeBoard(boardId: string) {
    const board = await this.findBoard(boardId);
    if (!board) throw new NotFoundException(`board with ${boardId} not found`);
    return this.BoardRepository.remove(board);
  }
}
