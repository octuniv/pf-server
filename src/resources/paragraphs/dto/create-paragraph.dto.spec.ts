import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateParagraphDto } from './create-paragraph.dto';
import { MakeParagraphDtoFaker } from '../fakers/paragraph.fakers';
import { config } from 'dotenv';

config({ path: '.env.variables' });

describe('Crate-Paragraph.Dto', () => {
  it('should be valid with valid properties', () => {
    const createParagraphDto = plainToClass(
      CreateParagraphDto,
      MakeParagraphDtoFaker(),
    );
    const errors = validateSync(createParagraphDto);
    expect(errors).toHaveLength(0);
  });

  it('should be invalid with wrong content property', () => {
    const SEP_LETTER = process.env.SEP_LETTER;
    const wrongParagraphDto = MakeParagraphDtoFaker();
    wrongParagraphDto.content = wrongParagraphDto.content + SEP_LETTER;
    const createParagraphDto = plainToClass(
      CreateParagraphDto,
      wrongParagraphDto,
    );
    const errors = validateSync(createParagraphDto);
    expect(errors).toHaveLength(1);
  });
});
