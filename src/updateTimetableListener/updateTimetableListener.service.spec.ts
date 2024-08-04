import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTimetableListenerService } from './updateTimetableListener.service';

describe('UpdateTimetableListenerService', () => {
  let service: UpdateTimetableListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTimetableListenerService],
    }).compile();

    service = module.get<UpdateTimetableListenerService>(UpdateTimetableListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
