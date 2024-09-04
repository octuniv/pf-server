import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Board } from '../../../src/resources/boards/entities/board.entity';
import { Test, TestingModule } from '@nestjs/testing';
import DbModuleForTest from '../DbModuleForTest';
import * as request from 'supertest';
import {
  MakeBoardDtoFaker,
  MakeBoardDtoHasOnlyTitleFaker,
  MakeHistoryDtoFaker,
} from '../../../src/resources/boards/faker/board.fakers';
import { BoardsModule } from '../../../src/resources/boards/boards.module';
import { historyDtoToEntity } from '../../../src/resources/boards/util/boards.utils';
import { HistoryIntro } from '../../../src/resources/boards/entities/historyIntro.entity';
import { History } from '../../../src/resources/boards/entities/history.entity';
// import { HistoryDto } from '../../../src/resources/boards/dto/history.dto';

describe('Board - /boards (e2e)', () => {
  let app: INestApplication;
  let board: Board;
  let lastHistory: History;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbModuleForTest, BoardsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('Create [Post /boards]', async () => {
    return request(app.getHttpServer())
      .post('/boards')
      .send(MakeBoardDtoFaker())
      .expect(201)
      .then(({ body }) => {
        board = body;
        expect(body).toBeDefined();
      });
  });

  it('find All Boards [Get /boards]', () => {
    return request(app.getHttpServer())
      .get('/boards')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0].id).toEqual(board.id);
        expect(body[0].historys).toHaveLength(2);
        expect(body[0].historys[0].contents).toHaveLength(3);
      });
  });

  it('find Board [Get /boards/board/:boardId]', () => {
    return request(app.getHttpServer())
      .get(`/boards/board/${board.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toEqual(board.id);
        expect(body.historys).toHaveLength(2);
      });
  });

  it('find History [Get /history/:boardId/:histId]', async () => {
    return request(app.getHttpServer())
      .get(`/boards/history/${board.id}/${board.historys[0].id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(board.historys[0]);
      });
  });

  it('Insert History [Post /boards/history/:boardId]', async () => {
    const histDto = MakeHistoryDtoFaker();
    await request(app.getHttpServer())
      .post(`/boards/history/${board.id}`)
      .send(histDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
    const expectHistoryEntity = historyDtoToEntity(histDto);
    return request(app.getHttpServer())
      .get(`/boards/history/${board.id}/${board.historys.at(-1).id + 1}`)
      .expect(200)
      .then(({ body }) => {
        lastHistory = body;
        expect(body.subtitle).toEqual(expectHistoryEntity.subtitle);
        expect(
          body.intros.map((intro: HistoryIntro) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, history_id, ...content } = intro;
            return content;
          }),
        ).toEqual(expectHistoryEntity.intros);
      });
  });

  it('Update [Patch /boards/:boardId]', async () => {
    const dtoHasOnlyTitle = MakeBoardDtoHasOnlyTitleFaker();
    await request(app.getHttpServer())
      .patch(`/boards/${board.id}`)
      .send(dtoHasOnlyTitle)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
    return request(app.getHttpServer())
      .get(`/boards/board/${board.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.title).not.toEqual(board.title);
        expect(body.title).toEqual(dtoHasOnlyTitle.title);
      });
  });

  it('Update History [Patch /boards/history/:boardId/:histId]', async () => {
    const historyDto = MakeHistoryDtoFaker();
    return request(app.getHttpServer())
      .patch(`/boards/history/${lastHistory.board_id}/${lastHistory.id}`)
      .send(historyDto)
      .expect(200)
      .then(({ body }: { body: History }) => {
        expect(body.subtitle).not.toEqual(lastHistory.subtitle);
        expect(body.subtitle).toEqual(historyDto.subtitle);
        expect(body.contents).not.toEqual(lastHistory.contents);
        expect(body.contents.map((content) => content.content)).toEqual(
          historyDto.contents,
        );
        lastHistory = body;
      });
  });

  it('remove History [Delete /boards/history/:boardId/:histId]', async () => {
    return request(app.getHttpServer())
      .delete(`/boards/history/${lastHistory.board_id}/${lastHistory.id}`)
      .expect(200)
      .then(({ body }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...deletedHistory } = lastHistory;
        expect(body).toEqual(deletedHistory);
      });
  });

  it('remove Board [Delete /boards/:boardId]', async () => {
    await request(app.getHttpServer())
      .delete(`/boards/${board.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
    return request(app.getHttpServer())
      .get('/boards')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });

  describe('all find* request should make sorted output', () => {
    const createRequest = async () => {
      return request(app.getHttpServer())
        .post('/boards')
        .send(MakeBoardDtoFaker())
        .expect(201);
    };

    const insertHistory = async (boardId: string) => {
      return request(app.getHttpServer())
        .post(`/boards/history/${boardId}`)
        .send(MakeHistoryDtoFaker())
        .expect(201);
    };

    const deleteHistory = async (boardId: string, histId: number) => {
      return request(app.getHttpServer())
        .delete(`/boards/history/${boardId}/${histId}`)
        .expect(200);
    };

    const deleteRequest = async (boardId: string) => {
      return request(app.getHttpServer())
        .delete(`/boards/${boardId}`)
        .expect(200);
    };

    const clearDB = async () => {
      const allIds = [];

      await request(app.getHttpServer())
        .get('/boards')
        .expect(200)
        .then(({ body }) => {
          body.forEach((board: Board) => allIds.push(board.id));
        });
      return Promise.all(allIds.map((id) => deleteRequest(id)));
    };

    it('find Sorted Historys in Board [Get /boards/board/:boardId]', async () => {
      let changeBoardId: string;
      let changeHistIds: number[];
      const isSortedHistories = (histories: History[]) =>
        histories.every((h, ind, arr) => !ind || arr[ind - 1].id < h.id);
      await createRequest();
      await request(app.getHttpServer())
        .get('/boards')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(1);
          changeBoardId = body[0].id;
          changeHistIds = body[0].historys.map((hist: History) => hist.id);
          expect(changeHistIds).toHaveLength(2);
        });
      await Promise.all(
        Array(4)
          .fill('')
          .map(() => insertHistory(changeBoardId)),
      );
      await deleteHistory(changeBoardId, changeHistIds[1]);

      return request(app.getHttpServer())
        .get(`/boards/board/${changeBoardId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.historys).toHaveLength(5);
          expect(isSortedHistories(body.historys)).toBeTruthy();
        })
        .then(() => clearDB());
    });

    it('find All Sorted Boards [Get /boards]', async () => {
      let deleteBoardId: string;
      const isSortedBoards = (boards: Board[]) =>
        boards.every((b, ind, arr) => !ind || arr[ind].createAt <= b.createAt);
      await Promise.all(
        Array(5)
          .fill('')
          .map(() => createRequest()),
      );
      await request(app.getHttpServer())
        .get('/boards')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(5);
          deleteBoardId = body[2].id;
        });
      await Promise.all(
        Array(3)
          .fill('')
          .map(() => createRequest()),
      );
      await deleteRequest(deleteBoardId);
      return request(app.getHttpServer())
        .get('/boards')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(7);
          expect(isSortedBoards(body)).toBeTruthy();
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
