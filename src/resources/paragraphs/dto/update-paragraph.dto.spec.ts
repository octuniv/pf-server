import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { MakeUpdateParagraphDtoFaker } from '../fakers/paragraph.fakers';
import { UpdateParagraphDto } from './update-paragraph.dto';

describe('Update-Paragraph.Dto', () => {
  it('should be valid with valid properties', () => {
    const updateParagraphDto = plainToClass(
      UpdateParagraphDto,
      MakeUpdateParagraphDtoFaker(),
    );
    const errors = validateSync(updateParagraphDto);
    expect(errors).toHaveLength(0);
  });
});
