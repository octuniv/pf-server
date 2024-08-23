import { faker } from '@faker-js/faker';
import { CreateParagraphDto } from '../dto/create-paragraph.dto';

import { config } from 'dotenv';

config({ path: '.env.variables' });

const SEP_LETTER = process.env.SEP_LETTER;

export const MakeParagraphDtoFaker = () => {
  const paragraphDtoFaker: CreateParagraphDto = {
    title: faker.lorem.sentence(),
    content: faker.lorem.sentences(3, SEP_LETTER),
  };

  return paragraphDtoFaker;
};
