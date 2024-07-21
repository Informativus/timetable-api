import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementService } from './replacement.service';

describe('ReplacementService', () => {
  let service: ReplacementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplacementService],
    }).compile();

    service = module.get<ReplacementService>(ReplacementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
