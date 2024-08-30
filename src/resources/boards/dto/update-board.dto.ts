import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialHistoryDto } from './partial-history.dto';
import { Type } from 'class-transformer';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartialHistoryDto)
  historys?: PartialHistoryDto[];
}
