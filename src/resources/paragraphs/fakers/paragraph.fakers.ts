import { faker } from '@faker-js/faker';
import { CreateParagraphDto } from '../dto/create-paragraph.dto';

import { config } from 'dotenv';
import { Paragraph } from '../entities/paragraph.entity';

config({ path: '.env.variables' });

const SEP_LETTER = process.env.SEP_LETTER;

export const MakeParagraphDtoFaker = () => {
  const paragraphDtoFaker: CreateParagraphDto = {
    title: faker.lorem.sentence(),
    content: faker.lorem.sentences(3, SEP_LETTER),
  };

  return paragraphDtoFaker;
};

export const MakeParagraphEntityFaker = () => {
  const paragraphEntity = new Paragraph();
  paragraphEntity.id = faker.string.uuid();
  paragraphEntity.title = faker.lorem.sentence();
  paragraphEntity.content = faker.lorem.sentences(3, SEP_LETTER);
  paragraphEntity.createAt = faker.date.recent();
  return paragraphEntity;
};

export const MakeUUIDFaker = () => faker.string.uuid();
