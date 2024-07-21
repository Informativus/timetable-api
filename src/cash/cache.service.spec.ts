import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

describe('CashService', () => {
  let service: CacheService<CreateReplacementDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService<CreateReplacementDto>>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
