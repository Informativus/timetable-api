import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GroupModule } from '../src/group/group.module';

describe('GroupController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GroupModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Group_info', () => {
    const URL = '/api/group_info';

    it('should return group info list', async () => {
      const queryParams = {
        id: '1I-1-23',
      };

      const response = await request(app.getHttpServer())
        .get(URL)
        .query(queryParams)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toEqual('1I-1-23');
    });

    it('should return bad request exeption', async () => {
      const queryParams = {
        id: '1I-1-22',
      };
      const response = await request(app.getHttpServer())
        .get(URL)
        .query(queryParams)
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.message).toBe('Group does not exist');
    });

    it('should return bad request exeption', async () => {
      const queryParams = {
        id: 1,
      };
      const response = await request(app.getHttpServer())
        .get(URL)
        .query(queryParams)
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.message).toBe('Group does not exist');
    });

    it('should return bad request exception for missing id', async () => {
      const response = await request(app.getHttpServer()).get(URL).expect(400);

      expect(response.body).toBeDefined();
    });
  });

  describe('Groups', () => {
    const URL = '/api/groups';
    it('should return groups list', async () => {
      const response = await request(app.getHttpServer()).get(URL).expect(200);

      expect(response.body).toBeDefined();
    });
  });
});
