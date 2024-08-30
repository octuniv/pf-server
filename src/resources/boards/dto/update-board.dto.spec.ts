import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { UpdateBoardDto } from './update-board.dto';
import {
  MakeBoardDtoHasOnlyIntroFaker,
  MakeBoardDtoHasOnlySubtitleFaker,
  MakeBoardDtoHasOnlyTitleFaker,
} from '../faker/board.fakers';
import { validateSync } from 'class-validator';

describe('Update-Board.Dto', () => {
  it('should be valid with dto to have only title', () => {
    const updateBoardDto = plainToInstance(
      UpdateBoardDto,
      MakeBoardDtoHasOnlyTitleFaker(),
    );
    const errors = validateSync(updateBoardDto);
    expect(errors).toHaveLength(0);
  });

  it('should be valid with dto to have only subtitle', () => {
    const updateBoardDto = plainToInstance(
      UpdateBoardDto,
      MakeBoardDtoHasOnlySubtitleFaker(),
    );
    const errors = validateSync(updateBoardDto);
    expect(errors).toHaveLength(0);
  });

  it('should be valid with dto to have only intros', () => {
    const updateBoardDto = plainToInstance(
      UpdateBoardDto,
      MakeBoardDtoHasOnlyIntroFaker(),
    );
    const errors = validateSync(updateBoardDto);
    expect(errors).toHaveLength(0);
  });
});
