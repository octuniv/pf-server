import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UpdateParagraphDto } from './update-paragraph.dto';

export class CreateParagraphDto extends PartialType(
  OmitType(UpdateParagraphDto, ['posts'] as const),
) {}
