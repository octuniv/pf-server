import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { HistoryDto } from './dto/history.dto';
import { PartialHistoryDto } from './dto/partial-history.dto';

/*
ToDo : write service
*/
@Injectable()
export class BoardsService {
  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  insertHistory(boardId: string, historyDto: HistoryDto) {
    /*
    ToDo: insert only one history
    */
    return '';
  }

  findAll() {
    return `This action returns all boards`;
  }

  findBoard(boardId: string) {
    return `This action returns a #${boardId} board`;
  }

  findHistory(boardId: string, historyId: number) {
    /*
    ToDo: find a history belong correct board
    */
    return '';
  }

  update(boardId: string, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${boardId} board`;
  }

  updateHistory(
    boardId: string,
    histId: number,
    updateHistoryDto: PartialHistoryDto,
  ) {
    return '';
  }

  removeHistory(boardId: string, historyId: number) {
    /*
    ToDo: delete a history belong correct board
    */
    return '';
  }

  removeBoard(boardId: string) {
    return `This action removes a #${boardId} board`;
  }
}
