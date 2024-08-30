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

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Post('/history/:boardId')
  async insertHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() insertHistoryDto: HistoryDto,
  ) {
    return this.boardsService.insertHistory(boardId, insertHistoryDto);
  }

  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get('/board/:boardId')
  async findBoard(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.findBoard(boardId);
  }

  @Get('/history/:boardId/:histId')
  async findHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
  ) {
    return this.boardsService.findHistory(boardId, histId);
  }

  @Patch(':boardId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Patch('/history/:boardId/:histId')
  async updateHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
    @Body() updateHistoryDto: HistoryDto,
  ) {
    return this.boardsService.updateHistory(boardId, histId, updateHistoryDto);
  }

  @Delete('/history/:boardId/:histId')
  async removeHistory(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('histId', new ParseIntPipe()) histId: number,
  ) {
    return this.boardsService.removeHistory(boardId, histId);
  }

  @Delete(':boardId')
  async removeBoard(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.removeBoard(boardId);
  }
}
