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
import { PgPost } from '../../../src/resources/paragraphs/entities/pgPost.entity';
import { UpdateParagraphDto } from '../../../src/resources/paragraphs/dto/update-paragraph.dto';

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

  describe('all find* request should make sorted output', () => {
    const createRequest = async () => {
      return request(app.getHttpServer())
        .post('/paragraphs')
        .send(MakeCreateParagraphDtoFaker())
        .expect(201)
        .then(({ body }) => {
          expect(body).toBeDefined();
        });
    };

    const updateRequest = async (id: string, paragDto: UpdateParagraphDto) => {
      return request(app.getHttpServer())
        .patch(`/paragraphs/update/${id}`)
        .send(paragDto)
        .expect(200);
    };

    const updateParag = MakeUpdateParagraphDtoFaker();

    const deleteRequest = async (id: string) => {
      return request(app.getHttpServer())
        .delete(`/paragraphs/delete/${id}`)
        .expect(200);
    };
    const clearDB = async () => {
      const ids = [];
      await request(app.getHttpServer())
        .get('/paragraphs')
        .expect(200)
        .then(({ body }) => {
          body.forEach((parag) => {
            ids.push(parag.id);
          });
        });
      await Promise.all(ids.map((id) => deleteRequest(id)));
    };

    it('Get all sorted paragraphs [GET /paragraphs]', async () => {
      let changedId: string;
      const isSortedParag = (parags: Paragraph[]) =>
        parags.every(
          (p, ind, arr) => !ind || arr[ind - 1].createAt <= p.createAt,
        );
      await Promise.all(
        Array(5)
          .fill('')
          .map(() => createRequest()),
      );
      await request(app.getHttpServer())
        .get('/paragraphs')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(5);
          changedId = body[2].id;
        });
      await updateRequest(changedId, updateParag);
      return request(app.getHttpServer())
        .get('/paragraphs')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(5);
          expect(isSortedParag(body)).toBeTruthy();
        })
        .then(() => clearDB());
    });

    it('Get sorted posts [GET /paragraphs/:id]', async () => {
      let changedId: string;
      const isSortedPosts = (posts: PgPost[]) =>
        posts.every((p, ind, arr) => !ind || arr[ind - 1].id < p.id);
      await createRequest();
      await request(app.getHttpServer())
        .get('/paragraphs')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(1);
          changedId = body[0].id;
        });
      await updateRequest(changedId, updateParag);
      return request(app.getHttpServer())
        .get(`/paragraphs/${changedId}`)
        .expect(200)
        .then(({ body }) => {
          expect(isSortedPosts(body.posts)).toBeTruthy();
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
