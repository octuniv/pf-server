import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import DbModuleForTest from '../DbModuleForTest';
import { UsersModule } from '../../../src/resources/users/users.module';
import { User } from '../../../src/resources/users/entities/user.entity';
import {
  MakeCreateUserDtoFaker,
  MakeUpdateUserDtoFaker,
} from '../../../src/resources/users/fakers/user.fakers';
import { SocialSite } from '../../../src/resources/users/entities/socialsite.entity';

describe('User - /users (e2e)', () => {
  let app: INestApplication;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbModuleForTest, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('Create [Post /users/]', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(MakeCreateUserDtoFaker())
      .expect(201)
      .then(({ body }) => {
        user = body;
        expect(body).toBeDefined();
      });
  });

  it('Update user [PATCH /users/update/:id]', async () => {
    const userDto = MakeUpdateUserDtoFaker();
    const { socialSites, ...restDtoElem } = userDto;
    return request(app.getHttpServer())
      .patch(`/users/update/${user.id}`)
      .send(userDto)
      .expect(200)
      .then(({ body }) => {
        user = body;
        const { id, socialSites: inputSites, ...restBody } = user;
        expect(id).toEqual(user.id);
        expect(restBody).toEqual(restDtoElem);
        expect(inputSites.map((site: SocialSite) => site.url)).toEqual(
          socialSites,
        );
      });
  });

  it('Get all Users [GET /users]', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1);
        const { socialSites, ...rest } = body[0];
        const { socialSites: expectSites, ...restUser } = user;
        expect(rest).toEqual(restUser);
        expect(socialSites).toEqual(
          expectSites.map((site) => ({
            id: site.id,
            url: site.url,
            user_id: site.user_id,
          })),
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
