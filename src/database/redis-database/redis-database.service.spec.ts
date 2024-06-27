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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
