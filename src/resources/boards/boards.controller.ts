import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { HistoryDto } from './dto/history.dto';
import { PartialHistoryDto } from './dto/partial-history.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Post('/history/:boardId')
  insertHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() insertHistoryDto: HistoryDto,
  ) {
    return this.boardsService.insertHistory(boardId, insertHistoryDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get('/board/:boardId')
  findBoard(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.findBoard(boardId);
  }

  @Get('/history/:boardId/:histId')
  findHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
  ) {
    return this.boardsService.findHistory(boardId, histId);
  }

  @Patch(':boardId')
  update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Patch('/history/:boardId/:histId')
  updateHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
    @Body() updateHistoryDto: PartialHistoryDto,
  ) {
    return this.boardsService.updateHistory(boardId, histId, updateHistoryDto);
  }

  @Delete('/history/:boardId/:histId')
  removeHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
  ) {
    return this.boardsService.removeHistory(boardId, histId);
  }

  @Delete(':boardId')
  removeBoard(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.removeBoard(boardId);
  }
}
