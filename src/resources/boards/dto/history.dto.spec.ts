import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { HistoryDto } from './history.dto';
import { MakeHistoryDtoFaker } from '../faker/board.fakers';
import { validateSync } from 'class-validator';

describe('History.Dto', () => {
  it('should be valid with valid properties', () => {
    const historyDto = plainToInstance(HistoryDto, MakeHistoryDtoFaker());
    const errors = validateSync(historyDto);
    expect(errors).toHaveLength(0);
  });
});
