import { Test, TestingModule } from '@nestjs/testing';
import { UpdateReplacementsListenerService } from './update-replacements-listener.service';

describe('UpdateReplacementsListenerService', () => {
  let service: UpdateReplacementsListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateReplacementsListenerService],
    }).compile();

    service = module.get<UpdateReplacementsListenerService>(UpdateReplacementsListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
