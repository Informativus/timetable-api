import { Test, TestingModule } from '@nestjs/testing';
import { RedisDatabaseService } from './redis-database.service';
import Redis from 'ioredis';

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  }));
});

describe('RedisDatabaseService', () => {
  let service: RedisDatabaseService;
  let redisClient: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisDatabaseService],
    }).compile();

    service = module.get<RedisDatabaseService>(RedisDatabaseService);
    redisClient = (service as any).redis;
  });

  describe('set', () => {
    it('should set a value in the redis database', async () => {
      await service.set('key', 'value');
      expect(redisClient.set).toHaveBeenCalledWith('key', 'value');
    });
  });
});
