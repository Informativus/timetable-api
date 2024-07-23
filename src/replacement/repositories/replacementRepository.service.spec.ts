import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementRepositoryService } from './replacementRepository.service';

describe('ReplacementService', () => {
  let service: ReplacementRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplacementRepositoryService],
    }).compile();

    service = module.get<ReplacementRepositoryService>(
      ReplacementRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
