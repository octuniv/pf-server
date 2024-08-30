import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class UpdateParagraphDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  posts: string[];
}
