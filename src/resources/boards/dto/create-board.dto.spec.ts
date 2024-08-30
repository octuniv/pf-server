import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { CreateBoardDto } from './create-board.dto';
import { MakeBoardDtoFaker } from '../faker/board.fakers';
import { validateSync } from 'class-validator';

describe('Create-Board.Dto', () => {
  it('should be valid with valid properties', () => {
    const createBoardDto = plainToInstance(CreateBoardDto, MakeBoardDtoFaker());
    const errors = validateSync(createBoardDto);
    expect(errors).toHaveLength(0);
  });
});
