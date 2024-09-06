import { Test, TestingModule } from '@nestjs/testing';
import { ReplacementsRepository } from './replacementsRepository.service';
import { IRelationDatabase } from 'src/database/relationDatabase.interface';
import { validateAndMapDto } from 'src/utils/validateAndMapDto.util';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { formatDateToSql } from 'src/utils/date.util';

jest.mock('src/utils/validateAndMapDto.util');

describe('ReplacementRepository', () => {
  let service: ReplacementsRepository;
  let mockRelationDatabase: Partial<IRelationDatabase>;

  beforeEach(async () => {
    mockRelationDatabase = {
      sendQuery: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementsRepository,
        { provide: 'IRelationDatabase', useValue: mockRelationDatabase },
      ],
    }).compile();

    service = module.get<ReplacementsRepository>(ReplacementsRepository);
  });

  describe('getReplacementWithDate', () => {
    it('should return replacement with date', async () => {});
  });
});
