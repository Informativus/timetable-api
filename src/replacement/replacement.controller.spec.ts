import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementController } from './replacement.controller';
import { ReplacementService } from './replacement.service';

describe('ReplacementController', () => {
  let controller: ReplacementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplacementController],
      providers: [ReplacementService],
    }).compile();

    controller = module.get<ReplacementController>(ReplacementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
