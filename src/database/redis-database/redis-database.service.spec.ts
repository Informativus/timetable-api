import { Test, TestingModule } from '@nestjs/testing';
import { RedisDatabaseService } from './redis-database.service';

describe('RedisDatabaseService', () => {
  let service: RedisDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisDatabaseService],
    }).compile();

    service = module.get<RedisDatabaseService>(RedisDatabaseService);
  });

  describe('set', () => {
    it('should set data in database', async () => {
      jest.spyOn(service, 'set');
      const jsonValue = JSON.stringify({ timetable: 'test' });
      expect(await service.set('test-group', jsonValue));
    });
  });

  describe('get', () => {
    it('should return data from database', async () => {
      jest.spyOn(service, 'get');
      const result = await service.get('test-group');
      expect(result).toEqual(JSON.stringify({ timetable: 'test' }));
    });
  });

  describe('delete', () => {
    it('should delete data from database', async () => {
      jest.spyOn(service, 'delete');
      const key = 'test-group';
      expect(await service.delete(key));
    });
  });
});
