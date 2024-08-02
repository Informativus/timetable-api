import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementsUpdateListenerService } from './replacements-update-listener.service';

describe('ReplacementsUpdateListenerService', () => {
  let service: ReplacementsUpdateListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplacementsUpdateListenerService],
    }).compile();

    service = module.get<ReplacementsUpdateListenerService>(ReplacementsUpdateListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
