import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { config } from 'dotenv';

config({ path: '.env.variables' });

const SEP_LETTER = process.env.SEP_LETTER;

export class CreateParagraphDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(`.+[^${SEP_LETTER}]$`))
  content: string;
}
