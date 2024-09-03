import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import DbModuleForTest from '../DbModuleForTest';

import { Paragraph } from '../../../src/resources/paragraphs/entities/paragraph.entity';
import { ParagraphsModule } from '../../../src/resources/paragraphs/paragraphs.module';
import {
  MakeCreateParagraphDtoFaker,
  MakeUpdateParagraphDtoFaker,
} from '../../../src/resources/paragraphs/fakers/paragraph.fakers';
import { PgPost } from 'src/resources/paragraphs/entities/pgPost.entity';

describe('Paragraph - /paragraphs (e2e)', () => {
  let app: INestApplication;
  let paragraph: Paragraph;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbModuleForTest, ParagraphsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('Create [Post /paragraphs]', async () => {
    return request(app.getHttpServer())
      .post('/paragraphs')
      .send(MakeCreateParagraphDtoFaker())
      .expect(201)
      .then(({ body }) => {
        paragraph = body;
        expect(body).toBeDefined();
      });
  });

  it('Get all paragraphs [GET /paragraphs]', async () => {
    return request(app.getHttpServer())
      .get('/paragraphs')
      .expect(200)
      .then(({ body }) => {
        const { posts, ...rest } = body[0];
        expect(body).toHaveLength(1);
        expect(posts).toEqual([]);
        expect(rest).toEqual(paragraph);
      });
  });

  it('Get a paragraph [GET /paragraphs/:id]', async () => {
    return request(app.getHttpServer())
      .get(`/paragraphs/${paragraph.id}`)
      .expect(200)
      .then(({ body }) => {
        const { posts, ...rest } = body;
        expect(posts).toEqual([]);
        expect(rest).toEqual(paragraph);
      });
  });

  it('Update paragraph [PATCH /paragraphs/update/:id]', async () => {
    const paragDto = MakeUpdateParagraphDtoFaker();
    const { title: dtoTitle, posts: dtoPosts } = paragDto;
    return request(app.getHttpServer())
      .patch(`/paragraphs/update/${paragraph.id}`)
      .send(paragDto)
      .expect(200)
      .then(({ body }) => {
        const { title, posts } = body;
        expect(title).toEqual(dtoTitle);
        expect(posts.map((post: PgPost) => post.post)).toEqual(dtoPosts);
      });
  });

  it('Delete paragraph [DELETE /paragraphs/delete/:id]', () => {
    return request(app.getHttpServer())
      .delete(`/paragraphs/delete/${paragraph.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.affected).toEqual(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
