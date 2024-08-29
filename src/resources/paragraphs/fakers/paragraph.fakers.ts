import { faker } from '@faker-js/faker';
import { Paragraph } from '../entities/paragraph.entity';
import { PgPost } from '../entities/pgPost.entity';
import { UpdateParagraphDto } from '../dto/update-paragraph.dto';
import { CreateParagraphDto } from '../dto/create-paragraph.dto';

export const MakeCreateParagraphDtoFaker = () => {
  const paragraphDto: CreateParagraphDto = {
    title: faker.lorem.sentence(),
  };
  return paragraphDto;
};

export const MakeUpdateParagraphDtoFaker = () => {
  const paragraphDtoFaker: UpdateParagraphDto = {
    title: faker.lorem.sentence(),
    posts: Array(3)
      .fill('')
      .map(() => faker.lorem.sentence()),
  };

  return paragraphDtoFaker;
};

export const FilterCreateParagraphDto = (updateDto: UpdateParagraphDto) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { posts, ...rest } = updateDto;
  return rest;
};

const MakePgPostEntityFaker = (seq: number, parag: Paragraph) => {
  const posts = new PgPost();
  posts.id = seq;
  posts.post = faker.lorem.sentence();
  posts.paragraph = parag;
  return posts;
};

export const MakeParagraphEntityFaker = () => {
  const paragraphEntity = new Paragraph();
  paragraphEntity.id = faker.string.uuid();
  paragraphEntity.title = faker.lorem.sentence();
  paragraphEntity.createAt = faker.date.recent();
  return paragraphEntity;
};

export const MakeParagraphsFaker = () => {
  const paragraphs = Array(3)
    .fill('')
    .map((_, fi) => {
      const paragraph = MakeParagraphEntityFaker();
      const posts = Array(3)
        .fill('')
        .map((_, si) => MakePgPostEntityFaker(fi * 3 + si + 1, paragraph));
      paragraph.posts = posts;
      return paragraph;
    });

  return paragraphs;
};

export const MakeUUIDFaker = () => faker.string.uuid();
