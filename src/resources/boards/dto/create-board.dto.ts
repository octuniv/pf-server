import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HistoryDto } from './history.dto';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoryDto)
  historys?: HistoryDto[];
}
