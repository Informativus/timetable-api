import { Test, TestingModule } from '@nestjs/testing';
import { PostgresDatabaseService } from './postgres-database.service';

describe('PostgresDatabaseService', () => {
  let service: PostgresDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresDatabaseService],
    }).compile();

    service = module.get<PostgresDatabaseService>(PostgresDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
