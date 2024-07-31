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
    it('should set data in database', async () => {
      (redisClient.set as jest.Mock).mockResolvedValue('OK');

      const jsonValue = JSON.stringify({ timetable: 'test' });
      await service.set('test-group', jsonValue);

      expect(redisClient.set).toHaveBeenCalledWith('test-group', jsonValue);
      expect(redisClient.set).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Redis set fails', async () => {
      (redisClient.set as jest.Mock).mockRejectedValue(new Error('Redis set error'));

      const jsonValue = JSON.stringify({ timetable: 'test' });

      await expect(service.set('test-group', jsonValue)).rejects.toThrow(
        'Redis method set returned error: Error: Redis set error',
      );
    });
  });

  describe('get', () => {
    it('should return data from database', async () => {
      const jsonValue = JSON.stringify({ timetable: 'test' });
      (redisClient.get as jest.Mock).mockResolvedValue(jsonValue);

      const result = await service.get('test-group');

      expect(result).toEqual(jsonValue);
      expect(redisClient.get).toHaveBeenCalledWith('test-group');
      expect(redisClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return null if key does not exist', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);

      const result = await service.get('non-existent-key');

      expect(result).toBeNull();
      expect(redisClient.get).toHaveBeenCalledWith('non-existent-key');
      expect(redisClient.get).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Redis get fails', async () => {
      (redisClient.get as jest.Mock).mockRejectedValue(new Error('Redis get error'));

      await expect(service.get('test-group')).rejects.toThrow(
        'Redis method get returned error: Error: Redis get error',
      );
    });
  });

  describe('delete', () => {
    it('should delete data from database', async () => {
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      await service.delete('test-group');

      expect(redisClient.del).toHaveBeenCalledWith('test-group', expect.any(Function));
      expect(redisClient.del).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Redis delete fails', async () => {
      (redisClient.del as jest.Mock).mockImplementation((key, callback) => {
       
