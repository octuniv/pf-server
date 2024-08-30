import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class HistoryDto {
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  intros: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  contents: string[];
}
